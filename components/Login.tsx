
import React, { useState } from 'react';
import { UserIcon } from './icons';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-800 p-8">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Welcome to Cloud Chat</h1>
        <p className="text-gray-400 mb-8">Enter your name to join the conversation.</p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative mb-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <UserIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Your Name"
              className="w-full p-3 pl-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              autoFocus
            />
          </div>
          <button
            type="submit"
            disabled={!username.trim()}
            className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-primary disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Join Chat
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
