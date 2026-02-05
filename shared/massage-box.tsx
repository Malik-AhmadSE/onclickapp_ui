'use client';

import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useChatStore } from "@/store/chat.store";
import { sendChatMessage, uploadDocument } from "@/lib/chat-api";

export default function MassageBox() {
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    addMessage,
    updateMessage,
    sessionId,
    isProcessing,
    setProcessing,
    addThinkingStep,
    finalizeThinking,
    selectedFile,
    setSelectedFile,
    clearFile,
  } = useChatStore();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('File too large. Maximum size is 10MB');
      return;
    }

    setSelectedFile({
      file,
      name: file.name,
      size: file.size,
      type: file.type,
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSend = async () => {
    const message = inputValue.trim();
    if (!message && !selectedFile) return;
    if (isProcessing) return;

    const file = selectedFile;
    setInputValue('');
    clearFile();
    setProcessing(true);

    try {
      if (file) {
        // Add user message with file
        addMessage({
          id: `${Date.now()}_user`,
          content: `📄 **${file.name}**${message ? `\n\n${message}` : ''}`,
          role: 'user',
          timestamp: new Date(),
        });

        // Add bot message placeholder
        const botMsgId = `${Date.now()}_bot`;
        addMessage({
          id: botMsgId,
          content: '',
          role: 'assistant',
          timestamp: new Date(),
          isTyping: true,
          thinking: [],
        });

        // Upload file first
        addThinkingStep(botMsgId, 'Uploading file...');
        const uploadRes = await uploadDocument(file.file, sessionId);
        addThinkingStep(botMsgId, `✓ Uploaded ${uploadRes.filename}`);

        // Then send message with file context
        const prompt = message || `Process the document I just uploaded: ${uploadRes.filename}`;
        addThinkingStep(botMsgId, 'Processing document...');

        await sendChatMessage(
          prompt,
          sessionId,
          true,
          (text, type, data) => {
            if (type === 'token') {
              updateMessage(botMsgId, { content: text });
            } else if (type === 'thinking' || type === 'thinking_partial') {
              addThinkingStep(botMsgId, data.data || data.message || 'Processing...');
            } else if (type === 'stream_start') {
              finalizeThinking(botMsgId);
            }
          }
        );

        finalizeThinking(botMsgId);
      } else {
        // Regular message without file
        addMessage({
          id: `${Date.now()}_user`,
          content: message,
          role: 'user',
          timestamp: new Date(),
        });

        const botMsgId = `${Date.now()}_bot`;
        addMessage({
          id: botMsgId,
          content: '',
          role: 'assistant',
          timestamp: new Date(),
          isTyping: true,
          thinking: [],
        });

        await sendChatMessage(
          message,
          sessionId,
          true,
          (text, type, data) => {
            if (type === 'token') {
              updateMessage(botMsgId, { content: text });
            } else if (type === 'thinking' || type === 'thinking_partial') {
              addThinkingStep(botMsgId, data.data || data.message || 'Processing...');
            } else if (type === 'stream_start') {
              finalizeThinking(botMsgId);
            }
          }
        );

        finalizeThinking(botMsgId);
      }
    } catch (error: any) {
      console.error('Chat error:', error);
      addMessage({
        id: `${Date.now()}_error`,
        content: `❌ Error: ${error.message}`,
        role: 'assistant',
        timestamp: new Date(),
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="rounded-2xl bg-white shadow-xl p-4 border border-[#E2E8F0] mb-6 mx-4">
      <div>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          accept=".pdf,.png,.jpg,.jpeg,.docx,.csv,.xlsx,.xls"
          className="hidden"
          disabled={isProcessing}
        />

        <div className="flex gap-1 xl:max-w-[750px] lg:max-w-[600px] md:max-w-[300] mb-2">
          <div
            onClick={() => !isProcessing && fileInputRef.current?.click()}
            className={!isProcessing ? "cursor-pointer" : ""}
          >
            <img src="/Paperclip.svg" alt="" />
          </div>

          <Textarea
            placeholder="Message..."
            rows={5}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isProcessing}
            className="p-0 w-full min-w-0 resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0 shadow-none placeholder:text-[#475569] placeholder:text-[16px]"
          />
        </div>

        {/* File preview - only shows when file selected */}
        {selectedFile && (
          <div className="mb-2 flex items-center gap-2 text-sm text-gray-600">
            <span>📎 {selectedFile.name}</span>
            <button
              onClick={() => clearFile()}
              disabled={isProcessing}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        )}

        <div className="flex items-center justify-end gap-2.5">
          <div className="rounded-full 2xl:h-[40px] xl:w-[35px] xl:h-[35px] w-[30px] h-[30px] flex justify-center items-center border border-[#CBD5E1]">
            <img src="/emoji.svg" alt="" />
          </div>
          <div className="rounded-full 2xl:w-[40px] 2xl:h-[40px] xl:w-[35px] xl:h-[35px] w-[30px] h-[30px] flex justify-center items-center border border-[#CBD5E1]">
            <img src="/voice.svg" alt="" />
          </div>
          <Button className="bg-[#AEE485] rounded-3xl text-black hover:bg-[#85df41]"
            onClick={handleSend}
            disabled={(!inputValue.trim() && !selectedFile) || isProcessing}
          >
            {isProcessing ? 'Sending...' : 'Send'}
            <img src="/send-icon.svg" alt="" />
          </Button>
        </div>
      </div>
    </div>
  );
}

