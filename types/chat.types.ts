/**
 * Chat Types - Core type definitions for chat functionality
 */

export interface Message {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: Date;
    thinking?: ThinkingStep[];
    actionButtons?: ActionButton[];
    isTyping?: boolean;
}

export interface ThinkingStep {
    id: string;
    message: string;
    timestamp: Date;
}

export interface ActionButton {
    id: string;
    label: string;
    action: string;
    variant: 'primary' | 'secondary' | 'danger';
    icon?: string;
}

export interface ChatFile {
    file: File;
    name: string;
    size: number;
    type: string;
}

export interface ChatRequest {
    message: string;
    session_id: string;
    include_file_context?: boolean;
}

export interface ChatResponse {
    response: string;
    session_id?: string;
}

export interface UploadResponse {
    filename: string;
    full_extraction: string;
    session_id: string;
}

export interface StreamEvent {
    type: 'token' | 'thinking' | 'thinking_partial' | 'stream_start' | 'tool' | 'error';
    data?: string;
    content?: string;
    message?: string;
}
