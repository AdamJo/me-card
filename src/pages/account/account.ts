import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public auth: AuthService, public alertCtrl: AlertController) {}

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
    this.navCtrl.setRoot(
      CreateCardPage,
      {
        edit: false,
        email: this.email,
        displayName: this.displayName,
        cardType: 'business'
      });
  }

  deleteCardAlert(cardName: string, index: number): void {
    let confirm = this.alertCtrl.create({
      title: 'Delete Card?',
      message: `This will permentaly delete the card "${cardName}"`,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.auth.deleteCard(cardName).remove().then(resolve => {
              this.auth.getCardsFirebase();
              this.cards.splice(index, 1);
            })
          }
        }
      ]
    });
    confirm.present();
  }

  loadCards() {
    this.auth.loadLocalCards().then((localCards) => {
      let keys = Object.keys(localCards);
      let allCards = []
      for (let index = 0, len = keys.length; index < len; index++) {
        if (localCards[keys[index]]) {
          allCards.push(localCards[keys[index]]);
        }
      }
      this.cards = allCards;
    });
  }
}
