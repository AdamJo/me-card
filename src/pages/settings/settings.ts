import { Component } from '@angular/core';

@Component({
  selector: 'Settings',
  templateUrl: 'Settings.html'
})
export class SettingsPage {

  text: string;

  constructor() {
    console.log('Hello Settings Component');
    this.text = 'Hello World';
  }
}
