import { Component } from '@angular/core';

import { Platform, NavParams, ViewController } from 'ionic-angular';

import { CamelCaseToHeaderPipe } from '../../pipes/camel-case-to-header';

@Component({
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          {{displayName}}
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
        <div *ngFor="let key of cardKeys; let i = index;">
          <h4 style="text-align: center;">{{key | camelCaseToHeader }}</h4>
          <ion-item style="text-align: center;">
            {{card[key]}}
          </ion-item>
        </div>
      </ion-list>
    </ion-content>
  `
})
export class ContactCardModal {

  card: any;
  displayName: string;
  cardKeys: Array<string> = [];

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController) {

    this.card = params.get('card');
    this.displayName = this.card['displayname']
    let keys = Object.keys(this.card);
    keys.pop();
    keys.pop();
    this.cardKeys = keys;
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }
}