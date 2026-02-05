

import type { ChatRequest, ChatResponse, UploadResponse, StreamEvent } from '@/types/chat.types';

export async function sendChatMessage(
    message: string,
    sessionId: string,
    includeFileContext: boolean = true,
    onChunk?: (text: string, type: string, data: StreamEvent) => void
): Promise<void> {
    const payload: ChatRequest = {
        message,
        session_id: sessionId,
        include_file_context: includeFileContext,
    };

    let fullText = '';

    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error('Stream not available');

        const decoder = new TextDecoder();

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const dataStr = line.slice(6);
                    if (dataStr === '[DONE]') return;

                    try {
                        const data: StreamEvent = JSON.parse(dataStr);

                        if (data.type === 'token') {
                            fullText += data.data || data.content || '';
                            onChunk?.(fullText, data.type, data);
                        } else {
                            // thinking, thinking_partial, stream_start, tool events
                            onChunk?.('', data.type, data);
                        }
                    } catch (e) {
                        console.error('Error parsing SSE:', e);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Stream error:', error);
        throw error;
    }
}

/**
 * Upload document file
 */
export async function uploadDocument(file: File, sessionId: string): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('session_id', sessionId);

    const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Upload failed' }));
        throw new Error(error.detail || 'Upload failed');
    }

    return await response.json();
}


export async function processDocument(
    extraction: string,
    instruction: string = 'Process this document'
): Promise<ChatResponse> {
    const formData = new FormData();
    formData.append('extraction', extraction);
    formData.append('instruction', instruction);

    const response = await fetch('/api/process-document', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'Processing failed' }));
        throw new Error(error.detail || 'Processing failed');
    }

    return await response.json();
}
