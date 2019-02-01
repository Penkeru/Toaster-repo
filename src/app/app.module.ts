import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {ToastMessagesComponent} from './components/toast-messages/toast-messages.component';


@NgModule({
  declarations: [
    AppComponent,
    ToastMessagesComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
