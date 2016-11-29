import { Component } from '@angular/core';

@Component({
  selector: 'Settings',
  templateUrl: 'Settings.html'
})
export class SettingsPage {

  text: string;

  constructor() {
    this.text = 'Hello World';
  }
}
