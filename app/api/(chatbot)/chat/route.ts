import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { message, session_id, include_file_context = true } = body;

        if (!message) {
            return NextResponse.json(
                { detail: 'Message is required' },
                { status: 400 }
            );
        }


        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                try {
                    const response = await fetch(`${API_BASE_URL}/api/chat`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            message,
                            session_id: session_id || `session_${Date.now()}`,
                            include_file_context,
                        }),
                    });

                    if (!response.ok) {
                        const error = await response.json().catch(() => ({ detail: 'Chat API error' }));
                        controller.enqueue(
                            encoder.encode(`data: ${JSON.stringify({ type: 'error', message: error.detail })}\n\n`)
                        );
                        controller.close();
                        return;
                    }

                    const reader = response.body?.getReader();
                    if (!reader) {
                        controller.enqueue(
                            encoder.encode(`data: ${JSON.stringify({ type: 'error', message: 'Stream not available' })}\n\n`)
                        );
                        controller.close();
                        return;
                    }

                    const decoder = new TextDecoder();

                    // Stream chunks from backend to client
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;

                        const chunk = decoder.decode(value, { stream: true });
                        controller.enqueue(encoder.encode(chunk));
                    }

                    controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                    controller.close();
                } catch (error: any) {
                    console.error('Stream error:', error);
                    controller.enqueue(
                        encoder.encode(`data: ${JSON.stringify({ type: 'error', message: error.message })}\n\n`)
                    );
                    controller.close();
                }
            },
        });

        return new NextResponse(stream, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });
    } catch (error: any) {
        console.error('Chat API error:', error);
        return NextResponse.json(
            { detail: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
