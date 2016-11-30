import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';

import { AuthService } from '../../shared/services/auth.service';

import { ContentModal } from '../../modals/contact.modal'

import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {

  contacts = [];
  allContacts = [];

  constructor(
    public navCtrl: NavController,
    public auth: AuthService,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController) {
    this.auth.loadMockData();
    this.initializeData();
  }

  initializeData() {
    this.contacts = this.allContacts;
  }

  ionViewWillEnter() {
    this.allContacts = this.auth.loadMockData().contacts;
    this.contacts = this.auth.loadMockData().contacts;
    // this.auth.loadLocalContacts().then(data => {
    //   this.contacts = data;
    //   this.allContacts = data;
    // })
    // this.auth.getContacts().subscribe(data => {
    //   this.contacts = data;
    //   this.allContacts = data;
    //   this.auth.saveContacts(data)
    // })
  }

  ionViewDidLoad() {}

  getContacts(searchOption) {
    this.initializeData();

    let val = searchOption.target.value;

    if (val && val.trim() != '') {
      this.contacts = this.contacts.filter((contact) => {
        return (contact.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  openContact(uid, displayName) {
    let cards = this.auth.loadMockData()['cards'][uid];
    console.log(cards);
    let modal = this.modalCtrl.create(ContentModal, { cards: cards, displayName: displayName });
    modal.present();
    // this.auth.getContactCards(uid)
    // .debounceTime(50)
    // .subscribe(data => {
    //   let modal = this.modalCtrl.create(ContentModal, { cards: data, displayName: displayName });
    //   modal.present();
    // });
  }

  deleteContact(uid, name, index) {
    let confirm = this.alertCtrl.create({
      title: 'Delete Contact?',
      message: `This will permentaly delete the contact: ${name}`,
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.auth.deleteContacts(uid).remove().then(resolve => {
              this.contacts.splice(index, 1);
              this.auth.saveContacts(this.contacts);
            })
          }
        }
      ]
    });
    confirm.present();
  }
}
