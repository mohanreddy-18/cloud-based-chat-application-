
import React from 'react';
import Header from './Header';
import ChatWindow from './ChatWindow';
import MessageInput from './MessageInput';
import { useChatWebSocket } from '../hooks/useChatWebSocket';
import { ConnectionStatus } from '../types';

interface ChatInterfaceProps {
  username: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ username }) => {
  const { messages, connectionStatus, sendMessage } = useChatWebSocket(username);

  const isInputDisabled = connectionStatus !== ConnectionStatus.Connected;

  return (
    <div className="flex flex-col h-full">
      <Header connectionStatus={connectionStatus} />
      <ChatWindow messages={messages} username={username} />
      <MessageInput onSendMessage={sendMessage} disabled={isInputDisabled} />
    </div>
  );
};

export default ChatInterface;
