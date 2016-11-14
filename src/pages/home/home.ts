import { Component, ViewChild  } from '@angular/core';

import { Platform, Nav, NavController } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { NFCPage } from '../nfc/nfc'

import { AuthService } from '../../services/auth.service'

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Nav) nav: Nav;


  loggedInPages: PageInterface[] = [
    { title: 'Account', component: LoginPage, index: 1, icon: 'person' },
    { title: 'NFC', component: NFCPage, index: 2, icon: 'card' },
    
  ];

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
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    this.navCtrl.push(page.component);

    if (page.logsOut === true) {
      console.log('inside pagelogout')
      // Give the menu time to close before changing to logged out
      setTimeout(() => {
        this.logout();
      }, 1000);
    }
  }
}