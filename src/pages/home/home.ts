import { Component, OnInit } from '@angular/core';

import { Platform } from 'ionic-angular';
import { NFC, Ndef } from 'ionic-native';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  constructor(public platform: Platform) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.pushUrl();
    });
  }

  pushUrl() {
    let message1 = Ndef.uriRecord('https://google.com')
    NFC.share([message1]).then(() => alert('success')).catch(() => alert('error'));
  }
}