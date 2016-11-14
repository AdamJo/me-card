import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NFC, Ndef } from 'ionic-native';
/*
  Generated class for the NFC page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-nfc',
  templateUrl: 'nfc.html'
})

export class NFCPage implements OnInit  {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello NFCPage Page');
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
