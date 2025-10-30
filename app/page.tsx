'use client';

import { useState } from 'react';
import ConversationsList from '@/components/ConversationsList';
import ChatView from '@/components/ChatView';
import NewConversationModal from '@/components/NewConversationModal';

export interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unread: boolean;
  messages: Message[];
}

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'John Doe',
      avatar: '👨‍💼',
      lastMessage: 'Hey! How are you doing?',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      unread: true,
      messages: [
        { id: '1', text: 'Hey there!', sender: 'other', timestamp: new Date(Date.now() - 1000 * 60 * 10) },
        { id: '2', text: 'Hi! How are you?', sender: 'me', timestamp: new Date(Date.now() - 1000 * 60 * 8) },
        { id: '3', text: 'Hey! How are you doing?', sender: 'other', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
      ]
    },
    {
      id: '2',
      name: 'Sarah Wilson',
      avatar: '👩‍🦰',
      lastMessage: 'See you tomorrow!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      unread: false,
      messages: [
        { id: '1', text: 'Are we still meeting tomorrow?', sender: 'other', timestamp: new Date(Date.now() - 1000 * 60 * 70) },
        { id: '2', text: 'Yes! Looking forward to it', sender: 'me', timestamp: new Date(Date.now() - 1000 * 60 * 65) },
        { id: '3', text: 'See you tomorrow!', sender: 'other', timestamp: new Date(Date.now() - 1000 * 60 * 60) },
      ]
    },
    {
      id: '3',
      name: 'Mike Johnson',
      avatar: '👨‍🎨',
      lastMessage: 'Thanks for the help!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      unread: false,
      messages: [
        { id: '1', text: 'Can you help me with this?', sender: 'other', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4) },
        { id: '2', text: 'Sure, what do you need?', sender: 'me', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.5) },
        { id: '3', text: 'Thanks for the help!', sender: 'other', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3) },
      ]
    },
  ]);

  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [showNewConversation, setShowNewConversation] = useState(false);

  const handleSelectConversation = (conversation: Conversation) => {
    setActiveConversation(conversation);
    // Mark as read
    setConversations(prev => prev.map(c => 
      c.id === conversation.id ? { ...c, unread: false } : c
    ));
  };

  const handleBackToList = () => {
    setActiveConversation(null);
  };

  const handleSendMessage = (text: string) => {
    if (!activeConversation) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'me',
      timestamp: new Date(),
    };

    setConversations(prev => prev.map(c => {
      if (c.id === activeConversation.id) {
        return {
          ...c,
          messages: [...c.messages, newMessage],
          lastMessage: text,
          timestamp: new Date(),
        };
      }
      return c;
    }));

    setActiveConversation(prev => prev ? {
      ...prev,
      messages: [...prev.messages, newMessage],
      lastMessage: text,
      timestamp: new Date(),
    } : null);
  };

  const handleCreateConversation = (name: string) => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      name,
      avatar: '👤',
      lastMessage: '',
      timestamp: new Date(),
      unread: false,
      messages: [],
    };

    setConversations(prev => [newConversation, ...prev]);
    setShowNewConversation(false);
    setActiveConversation(newConversation);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-black">
      {!activeConversation ? (
        <ConversationsList
          conversations={conversations}
          onSelectConversation={handleSelectConversation}
          onNewConversation={() => setShowNewConversation(true)}
        />
      ) : (
        <ChatView
          conversation={activeConversation}
          onBack={handleBackToList}
          onSendMessage={handleSendMessage}
        />
      )}

      {showNewConversation && (
        <NewConversationModal
          onClose={() => setShowNewConversation(false)}
          onCreate={handleCreateConversation}
        />
      )}
    </div>
  );
}
