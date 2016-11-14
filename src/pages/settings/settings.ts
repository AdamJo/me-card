import { Component } from '@angular/core';

/*
  Generated class for the Login component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
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
