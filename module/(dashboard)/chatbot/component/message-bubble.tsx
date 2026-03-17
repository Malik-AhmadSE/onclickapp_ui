"use client";

import { useChatStore } from "@/store/chat.store";
import { ChatButtons } from "./chat-buttons";
import MassageBox from "./massage-box";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ThinkingAccordion } from "../../../../shared/ThinkingAccordion";
import ChatAgGrid from "./chatAgGrid";
import { parseMarkdownTable } from "../../../../shared/utils/parseTable";
import { useEffect, useRef } from "react";

export function MessageBubble() {
  const { messages } = useChatStore();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function renderAssistantMessage(message: (typeof messages)[0]) {
    // If message content contains Markdown table
    if (message.content.includes("|")) {
      const { columnDefs, rowData } = parseMarkdownTable(message.content);
      return (
        <div className="w-full scrollbar-hide overflow-x-auto">
          <ChatAgGrid
            className="min-w-200  scrollbar-hide overflow-x-auto"
            columnDefs={columnDefs}
            rowData={rowData}
          />
        </div>
      );
    }

    // Otherwise, normal markdown
    return (
      <div className="prose prose-sm max-w-none prose-p:text-[14px] prose-p:my-1">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {message.content}
        </ReactMarkdown>
      </div>
    );
  }

  return (
    <div className="max-w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <div ref={scrollRef}
        className="flex-1 p-6 w-full overflow-y-auto scrollbar-hide flex flex-col gap-4">
        {/* Welcome message */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#AEE485] flex items-center justify-center text-white font-bold">
            AI
          </div>
          <div className="bg-white rounded-full border border-[#E2E8F0] p-2">
            <p className="text-[14px]">
              Hello! I'm your personal AI Assistant.
            </p>
          </div>
        </div>

        {/* Real messages from store */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-2 ${message.role === "user" ? "justify-end" : ""}`}
          >
            {/* Assistant avatar */}
            {message.role === "assistant" && (
              <div className="w-10 h-10 rounded-full bg-[#AEE485] flex items-center justify-center text-white font-bold shrink-0">
                AI
              </div>
            )}

            {/* Message content */}
            <div
              className={`rounded-xl p-4 ${message.role === "user"
                ? "bg-[#084F49] text-white max-w-md"
                : "bg-white border border-[#E2E8F0] max-w-[85%] w-full"
                }
  `}
            >
              {/* Thinking Accordion - only for assistant messages */}
              {message.role === "assistant" &&
                message.thinking &&
                message.thinking.length > 0 && (
                  <ThinkingAccordion
                    thinking={message.thinking}
                    isActive={message.isTyping || false}
                  />
                )}

              {/* Typing indicator */}
              {message.isTyping && message.content === "" ? (
                <div className="flex gap-1">
                  <span
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></span>
                  <span
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></span>
                </div>
              ) : (
                <>
                  {message.role === "user" ? (
                    <p className="text-[14px] whitespace-pre-wrap">
                      {message.content}
                    </p>
                  ) : (
                    renderAssistantMessage(message)
                  )}

                  <p
                    className={`text-[10px] mt-2 ${message.role === "user" ? "text-white/70" : "text-gray-500"}`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </>
              )}
            </div>

            {/* User avatar */}
            {message.role === "user" && (
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold shrink-0">
                U
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mb-10 min-w-0">
        <MassageBox />
        <ChatButtons />
      </div>
    </div>
  );
}
