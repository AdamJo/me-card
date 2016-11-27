import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../../shared/services/auth.service';

import { CreateCardPage } from '../create-card/create-card';

@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  displayName: string;
  email: string;
  photoUrl:string;
  cards: Array<any> = [];

  constructor(public navCtrl: NavController, public auth: AuthService) {}

  ngAfterViewInit() {
    this.getDisplayName();
    this.getEmail();
    this.getPhotoUrl();
  }

  ionViewWillEnter() {
    this.loadCards();
  }
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

    card['edit'] = true;

    this.navCtrl.setRoot(
      CreateCardPage,
      card);
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

  getFirebaseCards() {
    this.auth.getCardsFirebase();
  }

  loadCards() {
    this.auth.loadLocalCards().then((localCards) => {
      let keys = Object.keys(localCards);
      let allCards = []
      for (let index = 0, len = keys.length; index < len; index++) {
        allCards.push(localCards[keys[index]]);
      }
      this.cards = allCards;
      console.log(this.cards)
    });
  }
}
