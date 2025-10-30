'use client';

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface NewConversationModalProps {
  onClose: () => void;
  onCreate: (name: string) => void;
}

export default function NewConversationModal({ onClose, onCreate }: NewConversationModalProps) {
  const [contactName, setContactName] = useState('');

  const handleCreate = () => {
    if (contactName.trim()) {
      onCreate(contactName.trim());
      setContactName('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md animate-slide-up rounded-t-[20px] bg-zinc-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
          <button onClick={onClose} className="text-blue-500 text-[17px]">
            Cancel
          </button>
          <h2 className="text-[17px] font-semibold text-white">New Message</h2>
          <div className="w-[60px]"></div>
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-zinc-800 px-3 py-3">
            <label className="text-[17px] text-zinc-400">To:</label>
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
              placeholder="Name or phone number"
              className="flex-1 bg-transparent text-[17px] text-white placeholder-zinc-500 outline-none"
              autoFocus
            />
          </div>

          <button
            onClick={handleCreate}
            disabled={!contactName.trim()}
            className={`w-full rounded-lg py-3 text-[17px] font-semibold ${
              contactName.trim()
                ? 'bg-blue-500 text-white'
                : 'bg-zinc-800 text-zinc-600'
            }`}
          >
            Create Conversation
          </button>
        </div>
      </div>
    </div>
  );
}
