import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NFC, Ndef } from 'ionic-native';

@Component({
  selector: 'page-nfc',
  templateUrl: 'nfc.html'
})

export class NFCPage implements OnInit  {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.pushUrl();
    // this.platform.ready().then(() => {
    // });
  }

  pushUrl() {
    let message1 = Ndef.uriRecord('https://google.com')
    NFC.share([message1]).then(() => alert('success')).catch(() => alert('error'));
  }

}
