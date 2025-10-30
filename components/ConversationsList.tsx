'use client';

import { Conversation } from '@/app/page';
import { MagnifyingGlassIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { formatDistanceToNow } from 'date-fns';

interface ConversationsListProps {
  conversations: Conversation[];
  onSelectConversation: (conversation: Conversation) => void;
  onNewConversation: () => void;
}

export default function ConversationsList({ 
  conversations, 
  onSelectConversation, 
  onNewConversation 
}: ConversationsListProps) {
  return (
    <div className="flex h-screen flex-col bg-black">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-3">
        <button className="text-blue-500 text-[17px]">Edit</button>
        <h1 className="text-[34px] font-bold text-white">Messages</h1>
        <button 
          onClick={onNewConversation}
          className="text-blue-500"
        >
          <PencilSquareIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="border-b border-zinc-800 bg-zinc-900 px-4 py-2">
        <div className="flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-2">
          <MagnifyingGlassIcon className="h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search"
            className="flex-1 bg-transparent text-[17px] text-white placeholder-zinc-500 outline-none"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelectConversation(conversation)}
            className="flex cursor-pointer items-center border-b border-zinc-800 px-4 py-3 active:bg-zinc-900 transition-colors"
          >
            {/* Avatar */}
            <div className="mr-3 flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-[22px]">
              {conversation.avatar}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="text-[17px] font-semibold text-white truncate">
                  {conversation.name}
                </h3>
                <span className="ml-2 text-[15px] text-zinc-500 flex-shrink-0">
                  {formatDistanceToNow(conversation.timestamp, { addSuffix: false })}
                </span>
              </div>
              <p className={`text-[15px] truncate ${
                conversation.unread ? 'text-white font-medium' : 'text-zinc-500'
              }`}>
                {conversation.lastMessage || 'No messages yet'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
