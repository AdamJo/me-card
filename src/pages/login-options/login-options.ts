import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the LoginOptions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login-options',
  templateUrl: 'login-options.html'
})
export class LoginOptionsPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello LoginOptionsPage Page');
  }

}
