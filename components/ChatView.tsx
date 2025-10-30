'use client';

import { useState, useRef, useEffect } from 'react';
import { Conversation } from '@/app/page';
import { ChevronLeftIcon, InformationCircleIcon, CameraIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

interface ChatViewProps {
  conversation: Conversation;
  onBack: () => void;
  onSendMessage: (text: string) => void;
}

export default function ChatView({ conversation, onBack, onSendMessage }: ChatViewProps) {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  const handleSend = () => {
    if (messageText.trim()) {
      onSendMessage(messageText.trim());
      setMessageText('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageText(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  return (
    <div className="flex h-screen flex-col bg-black">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-zinc-800 bg-zinc-900 px-4 py-2">
        <button onClick={onBack} className="text-blue-500">
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        
        <div className="flex flex-1 items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-lg">
            {conversation.avatar}
          </div>
          <div className="flex-1">
            <h2 className="text-[17px] font-semibold text-white">{conversation.name}</h2>
            <p className="text-[13px] text-zinc-500">iMessage</p>
          </div>
        </div>

        <button className="text-blue-500">
          <InformationCircleIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {conversation.messages.map((message, index) => {
          const showTimestamp = index === 0 || 
            (conversation.messages[index - 1] && 
             message.timestamp.getTime() - conversation.messages[index - 1].timestamp.getTime() > 60000);

          return (
            <div key={message.id}>
              {showTimestamp && (
                <div className="mb-2 text-center text-[13px] text-zinc-500">
                  {format(message.timestamp, 'MMM d, h:mm a')}
                </div>
              )}
              <div className={`mb-2 flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[70%] rounded-[18px] px-4 py-2 ${
                    message.sender === 'me'
                      ? 'bg-blue-500 text-white'
                      : 'bg-zinc-800 text-white'
                  }`}
                >
                  <p className="text-[17px] leading-[22px]">{message.text}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Container */}
      <div className="border-t border-zinc-800 bg-zinc-900 px-2 py-2">
        <div className="flex items-end gap-2">
          <button className="mb-1 text-zinc-400 hover:text-zinc-300">
            <CameraIcon className="h-6 w-6" />
          </button>
          
          <div className="flex-1 flex items-center gap-2 rounded-[18px] bg-zinc-800 px-3 py-1.5">
            <textarea
              ref={textareaRef}
              value={messageText}
              onChange={handleTextareaChange}
              onKeyPress={handleKeyPress}
              placeholder="iMessage"
              rows={1}
              className="flex-1 resize-none bg-transparent text-[17px] text-white placeholder-zinc-500 outline-none"
              style={{ maxHeight: '120px' }}
            />
          </div>

          <button
            onClick={handleSend}
            disabled={!messageText.trim()}
            className={`mb-1 ${
              messageText.trim() ? 'text-blue-500' : 'text-zinc-600'
            }`}
          >
            <PaperAirplaneIcon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
