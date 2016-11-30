import { Component } from '@angular/core';

import { Platform, NavParams, ViewController, ModalController } from 'ionic-angular';

import { ContactCardModal } from './contact-card.modal'

@Component({
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          {{displayName}}'s Cards
        </ion-title>
        <ion-buttons start>
          <button style="font-size: 20px;" showWhen="android,windows" ion-button (click)="dismiss()">
            <ion-icon name="md-close"></ion-icon>
          </button>
          <button style="font-size: 20px;" showWhen="ios" ion-button (click)="dismiss()">
            <span color="primary" >Cancel</span>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <div *ngFor="let card of cards; let i = index;">
          <ion-item (click)="openPrompt(i)">
            <button ion-button block >
              {{card.displayName}}
            </button>
          </ion-item>
        </div>
      </ion-list>
    </ion-content>
  `
})

export class ContentModal {

  cards: any;
  displayName: string;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController) {

    this.cards = params.get('cards');
    this.displayName = params.get('displayName');
  }

  openPrompt(index) {
    let modal = this.modalCtrl.create(ContactCardModal, {card: this.cards[index]});
    modal.present();    
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }
}