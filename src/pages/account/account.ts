import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../shared/services/auth.service'

import { CreateCardPage } from '../create-card/create-card'

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
    this.getStuff();
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

  getStuff() {
    this.auth.getStuff().then((stuff) => {
      console.log(stuff)
    });
  }

  createCard() {
    this.navCtrl.setRoot(CreateCardPage)
  }
}
