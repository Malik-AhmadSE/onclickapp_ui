'use client';

import { useState, useEffect } from 'react';
import type { ThinkingStep } from '@/types/chat.types';

interface ThinkingAccordionProps {
    thinking: ThinkingStep[];
    isActive: boolean;
}

export function ThinkingAccordion({ thinking, isActive }: ThinkingAccordionProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        if (isActive) {
            const startTime = Date.now();
            const timer = setInterval(() => {
                setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setIsOpen(false);
        }
    }, [isActive]);

    if (thinking.length === 0) return null;

    return (
        <details
            open={isOpen}
            className={`mb-3 overflow-hidden rounded-lg border ${isActive ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-gray-50'
                }`}
        >
            <summary
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }}
                className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 list-none"
            >
                <span className="text-sm">
                    {isActive ? '⚡' : '✓'}
                </span>
                <span className="flex-1">
                    {isActive ? 'Thinking...' : 'Finished Thinking'}
                </span>
                <span className="text-xs opacity-70">{elapsedTime}s</span>
            </summary>

            <div className="border-t border-gray-200 bg-white py-1">
                {thinking.map((step, index) => (
                    <div
                        key={step.id}
                        className={`flex items-center gap-2 border-l-2 px-3 py-1.5 text-xs ${isActive
                            ? 'border-blue-500 bg-gradient-to-r from-blue-50 to-transparent'
                            : 'border-green-500 bg-gradient-to-r from-green-50 to-transparent'
                            }`}
                        style={{
                            animation: isActive ? 'pulse 1.5s ease-in-out infinite' : 'none'
                        }}
                    >
                        <span>{step.message}</span>
                    </div>
                ))}
            </div>
        </details>
    );
}
