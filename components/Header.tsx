
import React from 'react';
import { ConnectionStatus } from '../types';

interface HeaderProps {
  connectionStatus: ConnectionStatus;
}

const statusConfig = {
  [ConnectionStatus.Connected]: { text: 'Connected', color: 'bg-green-500' },
  [ConnectionStatus.Connecting]: { text: 'Connecting', color: 'bg-yellow-500' },
  [ConnectionStatus.Disconnected]: { text: 'Disconnected', color: 'bg-red-500' },
};

const Header: React.FC<HeaderProps> = ({ connectionStatus }) => {
  const { text, color } = statusConfig[connectionStatus];

  return (
    <header className="flex items-center justify-between p-4 bg-gray-700/50 border-b border-gray-700 text-white">
      <h1 className="text-xl font-bold">Real-Time Chat</h1>
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${color}`} />
        <span className="text-sm text-gray-300">{text}</span>
      </div>
    </header>
  );
};

export default Header;
