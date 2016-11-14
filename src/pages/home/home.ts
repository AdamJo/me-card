import { Component } from '@angular/core';

import { Platform, NavController } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';
import { NFCPage } from '../nfc/nfc';
import { AccountPage } from '../account/account';
import { AboutPage } from '../about/about';

import { AuthService } from '../../shared/services/auth.service';
import { PageInterface } from '../../shared/models/page-interface.model'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  loggedInPages: PageInterface[] = [
    { title: 'Account', component: AccountPage, index: 1, icon: 'person' },
    { title: 'NFC', component: NFCPage, index: 2, icon: 'card' },
    { title: 'Setting', component: SettingsPage, index: 3, icon: 'settings'},
    { title: 'About', component: AboutPage, icon: 'information'}
  ];

  loggedOutPages: PageInterface[] = [
    { title: 'Home', component: HomePage, icon: 'home'},
    { title: 'About', component: AboutPage, icon: 'information'}
  ]

  constructor(
    public platform: Platform,
    public authService: AuthService,
    public navCtrl: NavController) {
  }

  loginGithub() {
    this.authService.signInWithGithub()
  }

  loginTwitter() {
    this.authService.signInWithTwitter()
  }

  loginGoogle() {
    this.authService.signInWithGoogle()
  }

  loginFacebook() {
    this.authService.signInWithFacebook()
  }

  logout() {
     this.authService.signOut();
  }

  authCheck() {
    this.authService.authDetails();
  }

  openPage(page: PageInterface) {
    this.navCtrl.push(page.component);
  }

  savedUser() {
    this.authService.saveUser();
  }
}