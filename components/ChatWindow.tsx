
import React, { useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import MessageBubble from './MessageBubble';

interface ChatWindowProps {
  messages: ChatMessage[];
  username: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, username }) => {
  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
        <div className="flex flex-col space-y-2">
            {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} isOwnMessage={msg.username === username} />
            ))}
            <div ref={endOfMessagesRef} />
        </div>
    </div>
  );
};

export default ChatWindow;
