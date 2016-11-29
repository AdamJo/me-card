import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { AuthService } from '../../shared/services/auth.service';

import { ContentModal } from '../../modals/contact.modal'

@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html'
})
export class ContactsPage {

  contacts = [];
  allContacts = [];


  constructor(public navCtrl: NavController, public auth: AuthService, public modalCtrl: ModalController) {
    this.initializeData();
  }

  initializeData() {
    this.contacts = this.allContacts;
  }

  ionViewWillEnter() {
    this.auth.loadLocalContacts().then(data => {
      this.contacts = data;
      this.allContacts = data;
    })
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
    this.auth.getContactCards(uid).subscribe(data => {
      let modal = this.modalCtrl.create(ContentModal, { cards: data, displayName: displayName });
      modal.present();
    });
  }
}
