import { create } from 'zustand';
import type { Message, ChatFile } from '@/types/chat.types';

interface ChatState {

    messages: Message[];
    selectedFile: ChatFile | null;
    isProcessing: boolean;
    sessionId: string;

    // Actions
    addMessage: (message: Message) => void;
    updateMessage: (id: string, updates: Partial<Message>) => void;
    removeMessage: (id: string) => void;
    setSelectedFile: (file: ChatFile | null) => void;
    clearFile: () => void;
    setProcessing: (isProcessing: boolean) => void;
    clearMessages: () => void;
    addThinkingStep: (messageId: string, step: string) => void;
    finalizeThinking: (messageId: string) => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
    // Initial state
    messages: [],
    selectedFile: null,
    isProcessing: false,
    sessionId: `session_${Date.now()}_${Math.random().toString(36).slice(2)}`,

    addMessage: (message) =>
        set((state) => ({
            messages: [...state.messages, message],
        })),

    // Update existing message
    updateMessage: (id, updates) =>
        set((state) => ({
            messages: state.messages.map((msg) =>
                msg.id === id ? { ...msg, ...updates } : msg
            ),
        })),

    // Remove message
    removeMessage: (id) =>
        set((state) => ({
            messages: state.messages.filter((msg) => msg.id !== id),
        })),

    // Set selected file
    setSelectedFile: (file) =>
        set({ selectedFile: file }),

    // Clear file
    clearFile: () =>
        set({ selectedFile: null }),

    // Set processing state
    setProcessing: (isProcessing) =>
        set({ isProcessing }),


    clearMessages: () =>
        set({ messages: [] }),

    addThinkingStep: (messageId, step) =>
        set((state) => ({
            messages: state.messages.map((msg) =>
                msg.id === messageId
                    ? {
                        ...msg,
                        thinking: [
                            ...(msg.thinking || []),
                            {
                                id: `${Date.now()}_${Math.random()}`,
                                message: step,
                                timestamp: new Date(),
                            },
                        ],
                    }
                    : msg
            ),
        })),

    // Finalize thinking (mark as complete)
    finalizeThinking: (messageId) =>
        set((state) => ({
            messages: state.messages.map((msg) =>
                msg.id === messageId
                    ? { ...msg, isTyping: false }
                    : msg
            ),
        })),
}));
