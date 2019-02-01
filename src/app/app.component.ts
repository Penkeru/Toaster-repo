import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  toastMessageStyling = {};

  constructor() {

    // An Example - Dynamic Placement?
    this.toastMessageStyling = {
      'width': '200px',
      'height': '100%',
      'justify-content': 'center',
      'overflow': 'hidden',
      'margin': '0 auto'};
  }
}


