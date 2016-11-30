import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AccountPage } from '../account/account';
import { SettingsPage } from '../settings/settings';
import { ContactsPage } from '../contacts/contacts';

import { AuthService } from '../../shared/services/auth.service'

@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = AccountPage;
  tab2Root: any = ContactsPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams, public auth: AuthService) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
