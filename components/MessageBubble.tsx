
import React from 'react';
import { ChatMessage } from '../types';

interface MessageBubbleProps {
  message: ChatMessage;
  isOwnMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isOwnMessage }) => {
  if (message.type === 'notification') {
    return (
      <div className="text-center my-2">
        <span className="text-xs text-gray-400 px-3 py-1 bg-gray-700 rounded-full">
          {message.text}
        </span>
      </div>
    );
  }

  const alignment = isOwnMessage ? 'justify-end' : 'justify-start';
  const bubbleColor = isOwnMessage ? 'bg-blue-600' : 'bg-gray-600';
  const bubblePosition = isOwnMessage ? 'rounded-br-none' : 'rounded-bl-none';
  const textColor = 'text-white';
  const time = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex ${alignment} my-1`}>
      <div className="flex flex-col max-w-xs md:max-w-md">
        {!isOwnMessage && (
          <span className="text-xs text-gray-400 mb-1 ml-2">{message.username}</span>
        )}
        <div className={`px-4 py-2 rounded-2xl ${bubbleColor} ${bubblePosition} ${textColor}`}>
          <p className="text-sm break-words">{message.text}</p>
        </div>
        <span className={`text-xs text-gray-500 mt-1 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
          {time}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
