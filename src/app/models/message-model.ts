type MessageType = 'success' | 'error' | 'warning' | 'info';

export interface MessageModel {
  messageId: number;
  body: string;
  image: string;
  type: MessageType;
  dismissed: boolean;
}

export class MessageModel implements MessageModel {
  body = '';
  image = '';
  type = 'info' as MessageType;
  dismissed = false;

  constructor(body: string, image: string, type: MessageType) {
    this.body = body || '';
    this.image = image || '';
    this.type = type || 'info' as MessageType;
    this.dismissed = false;
  }
}
