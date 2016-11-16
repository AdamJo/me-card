import { Component } from '@angular/core';

import { Platform, NavController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs'; 

import { AuthService } from '../../shared/services/auth.service';
import { PageInterface } from '../../shared/models/page-interface.model'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

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
    this.authService.signInWithGoogle().then(a => {
      this.navCtrl.push(TabsPage);
    })
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
}