import { Component } from '@angular/core';

/*
  Generated class for the Login component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

  text: string;

  constructor() {
    console.log('Hello Login Component');
    this.text = 'Hello World';
  }
}
