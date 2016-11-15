import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { NFCPage } from '../nfc/nfc';
import { AccountPage } from '../account/account';
import { AboutPage } from '../about/about';
import { ContactsPage } from '../contacts/contacts';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}