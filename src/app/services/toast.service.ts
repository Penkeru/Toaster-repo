import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  socketIsOpen = 1;
  ws: WebSocket;
  messages;
  url: string;

  constructor() {}

  openMessagePipe(url) {
    this.ws = new WebSocket(url);
    return new Observable(
      observer => {
        this.ws.onmessage = (event) => observer.next(event.data);
        this.ws.onerror = (event) => observer.error(event);
        this.ws.onclose = (event) => observer.complete();
        return () => this.ws.close(1000, 'No More Messages');
      }
    );
  }

  sendMessage(message: string): string {
    if (this.ws.readyState === this.socketIsOpen) {
      this.ws.send(message);
      return 'send to server ${message}';
    } else {
      return 'message was not sent - the socket is closed';
    }
  }
}
