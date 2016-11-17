import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../shared/services/auth.service'

/*
  Generated class for the Account page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  username: string;
  email: string;
  photoUrl:string;

  constructor(public navCtrl: NavController, public auth: AuthService) {}

  ngAfterViewInit() {
    this.getUsername();
    this.getEmail();
    this.getPhotoUrl();
  }

  getUsername() {
    this.auth.getUsername().then((username) => {
      this.username = username;
    });
  }

  getEmail() {
    this.auth.getEmail().then((email) => {
      this.email = email;
    });
  }

  getPhotoUrl() {
    this.auth.getPhotoUrl().then((photoUrl) => {
      this.photoUrl = photoUrl;
    });
  }
}
