import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ToastService} from '../../services/toast.service';
import {MessageModel} from '../../models/message-model';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-toast-messages',
  templateUrl: './toast-messages.component.html',
  styleUrls: ['./toast-messages.component.css']
})
export class ToastMessagesComponent implements OnDestroy {
  @Input() containerStyle = '';
  wsSubscription;
  messages: MessageModel[] = [];
  timeoutSession = 5000;
  animationTimeout = 1000;
  clearDismissedMessageInterval;

  constructor(private toastService: ToastService) {
    this.clearDismissedMessageInterval = setInterval(this.clearMessagesForList.bind(this), this.timeoutSession + this.animationTimeout);
    this.wsSubscription = this.toastService.openMessagePipe().pipe(
      map(data => {
        const dataToJson = JSON.parse(data as string);
        return new MessageModel(dataToJson.body, dataToJson.image, dataToJson.type);
      })
    ).subscribe(
      (message: MessageModel) => {
        setTimeout(() => {
          message.dismissed = true;

        }, this.timeoutSession);
        this.messages.unshift(message);
      },
      error => console.error(error),
      () => console.warn('No new messages')
    );
  }

  private clearMessagesForList() {
    this.messages = this.messages.filter(message => message.dismissed === false);
  }

  closeToast(message) {
    message.dismissed = true;
  }

  ngOnDestroy() {
    clearInterval(this.clearDismissedMessageInterval);
    this.closeSocket();
  }

  private closeSocket() {
    this.wsSubscription.unsubscribe();
  }
}
