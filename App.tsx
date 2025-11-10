
import React, { useState, useCallback } from 'react';
import Login from './components/Login';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  const handleLogin = useCallback((name: string) => {
    if (name.trim()) {
      setUsername(name.trim());
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="w-full max-w-4xl h-[90vh] max-h-[800px] bg-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-700">
        {username ? (
          <ChatInterface username={username} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </div>
  );
};

export default App;
