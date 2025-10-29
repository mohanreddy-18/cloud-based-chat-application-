
import { useState, useEffect, useRef, useCallback } from 'react';
import { ChatMessage, ConnectionStatus } from '../types';

// IMPORTANT: Replace this with your actual AWS API Gateway WebSocket URL.
// The URL should look something like: wss://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/production
const WEBSOCKET_URL = 'wss://your-aws-websocket-api-url.com';

export const useChatWebSocket = (username: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(ConnectionStatus.Connecting);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!username) return;

    // Acknowledge the user that we are using a placeholder URL if it's not changed.
    if (WEBSOCKET_URL === 'wss://your-aws-websocket-api-url.com') {
      console.warn("Using placeholder WebSocket URL. Please replace with your actual AWS WebSocket URL in hooks/useChatWebSocket.ts");
      // Add a friendly message to the chat window for visibility
      setMessages([{
        id: 'warning-1',
        username: 'System',
        text: 'Welcome! Please note this is a demo. To connect to your own backend, update the WEBSOCKET_URL in hooks/useChatWebSocket.ts.',
        timestamp: Date.now(),
        type: 'notification',
      }]);
      setConnectionStatus(ConnectionStatus.Disconnected);
      return;
    }

    const socket = new WebSocket(WEBSOCKET_URL);
    socketRef.current = socket;
    setConnectionStatus(ConnectionStatus.Connecting);

    socket.onopen = () => {
      setConnectionStatus(ConnectionStatus.Connected);
      const joinMessage: ChatMessage = {
        id: `join-${Date.now()}`,
        username: 'System',
        text: `${username} has joined the chat.`,
        timestamp: Date.now(),
        type: 'notification',
      };
      setMessages(prev => [...prev, joinMessage]);
      // The backend should handle broadcasting this, this is for local display
    };

    socket.onmessage = (event) => {
      try {
        const messageData = JSON.parse(event.data);
        // Assuming the backend sends messages in the ChatMessage format
        if (messageData.action === 'message' && messageData.data) {
             setMessages(prev => [...prev, messageData.data]);
        }
      } catch (error) {
        console.error('Failed to parse incoming message:', error);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket Error:', error);
      setConnectionStatus(ConnectionStatus.Disconnected);
    };

    socket.onclose = () => {
      setConnectionStatus(ConnectionStatus.Disconnected);
       const leaveMessage: ChatMessage = {
        id: `leave-${Date.now()}`,
        username: 'System',
        text: 'You have been disconnected.',
        timestamp: Date.now(),
        type: 'notification',
      };
      setMessages(prev => [...prev, leaveMessage]);
    };

    return () => {
      socket.close();
      socketRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const sendMessage = useCallback((text: string) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const message: ChatMessage = {
        id: `${username}-${Date.now()}`,
        username,
        text,
        timestamp: Date.now(),
        type: 'message',
      };

      // The payload structure depends on your AWS API Gateway configuration.
      // A common pattern is to wrap it in a JSON object with an "action".
      const payload = JSON.stringify({
        action: 'sendMessage',
        data: message,
      });

      socketRef.current.send(payload);
      // Add the message to the local state immediately for a responsive feel.
      // The backend will be the source of truth for other clients.
      setMessages(prev => [...prev, message]);
    } else {
      console.error('Cannot send message, WebSocket is not connected.');
    }
  }, [username]);

  return { messages, connectionStatus, sendMessage };
};
