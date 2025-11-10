
import { WebSocket, WebSocketServer } from 'ws';

interface ChatMessage {
  id: string;
  username: string;
  text: string;
  timestamp: number;
  type: 'message' | 'notification';
}

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', ws => {
  console.log('Client connected');

  ws.on('message', message => {
    try {
      const parsedMessage = JSON.parse(message.toString());

      // Basic validation
      if (parsedMessage.action === 'sendMessage' && parsedMessage.data) {
        const chatMessage: ChatMessage = parsedMessage.data;

        // Broadcast the message to all connected clients
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
              action: 'message',
              data: chatMessage,
            }));
          }
        });
      }
    } catch (error) {
      console.error('Failed to parse message or invalid message format:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.send(JSON.stringify({
    action: 'message',
    data: {
      id: `system-${Date.now()}`,
      username: 'System',
      text: 'Welcome to the chat!',
      timestamp: Date.now(),
      type: 'notification',
    },
  }));
});

console.log('WebSocket server started on ws://localhost:8080');
