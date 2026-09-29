import React from 'react';
import { Bot, MessageSquareCode, Sparkles } from 'lucide-react';

interface N8nChatFloatingTriggerProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const N8nChatFloatingTrigger: React.FC<N8nChatFloatingTriggerProps> = ({ isOpen, onToggle }) => {
  if (isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 group">
      <button
        onClick={onToggle}
        aria-label="Open Exam AI Chatbot"
        className="relative flex items-center gap-2.5 bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border border-white/20 focus:outline-none focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
      >
        {/* Pulse indicator */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900"></span>
        </span>

        <div className="flex items-center justify-center">
          <Bot className="w-5 h-5 animate-pulse" />
        </div>

        <div className="flex flex-col text-left pr-0.5">
          <span className="text-xs font-bold tracking-wide flex items-center gap-1 leading-none">
            Exam AI Chat
            <Sparkles className="w-3 h-3 text-amber-300" />
          </span>
          <span className="text-[10px] text-indigo-100 font-medium leading-tight mt-0.5">
            n8n Assistant
          </span>
        </div>
      </button>
    </div>
  );
};
