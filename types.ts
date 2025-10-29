
export enum ConnectionStatus {
  Connecting = 'CONNECTING',
  Connected = 'CONNECTED',
  Disconnected = 'DISCONNECTED',
}

export interface ChatMessage {
  id: string;
  username: string;
  text: string;
  timestamp: number;
  type: 'message' | 'notification';
}
