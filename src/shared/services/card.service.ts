import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core'
import { Storage } from '@ionic/storage';

@Injectable()
export class SettingsService {
  cards: any;

  constructor(public af:AngularFire, public storage: Storage) {}

  // get all user cards
  getCards():void {
    this.af.database
  }

  // get all info on card
  getCard():void {}

  // save card on user creation/change
  saveCard(): void {
    this.saveCardLocal()
    this.saveCardFirebase()
  }

  saveCardLocal() {
    this.storage.set('cards', 'cards');
  }

  saveCardFirebase() {

  }

  // main card to be shown if multiple are had.
  setMainCard():void {}
}
