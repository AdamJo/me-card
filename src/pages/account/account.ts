import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../shared/services/auth.service';

import { CreateCardPage } from '../create-card/create-card';
import { Card } from '../../shared/models/card.model';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  displayName: string;
  email: string;
  photoUrl:string;
  cards: any;

  constructor(public navCtrl: NavController, public auth: AuthService) {
    this.auth.loadLocalCards().then((cards) => {
      this.cards = cards;
    });
  }

  ngAfterViewInit() {
    this.getDisplayName();
    this.getEmail();
    this.getPhotoUrl();
  }

  ionViewDidEnter() {}

  getDisplayName() {
    this.auth.getDisplayName().then((displayName) => {
      this.displayName = displayName;
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

  editCard(card) {
    console.log(card);
    this.navCtrl.setRoot(
      CreateCardPage,
      {
        edit: true,
        cardName: card.cardName,
        email: card.email,
        displayName: card.displayName
      });
  }

  createCard() {
    console.log(this.displayName);
    this.navCtrl.setRoot(
      CreateCardPage,
      {
        edit: false,
        email: this.email,
        displayName: this.displayName
      });
  }
}
