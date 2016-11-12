import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from 'ionic-angular';
import { NFC, Ndef } from 'ionic-native';

import { AngularFire, AngularFireAuth, FirebaseAuth, FirebaseAuthState, AuthProviders  } from 'angularfire2';

import { LoginPage } from '../login/login';

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  constructor(
    public platform: Platform,
    public af: AngularFire,
    public navController:NavController,
    public auth$: FirebaseAuth,
    public authService: AuthService) {
    // this.af.auth.subscribe(auth => {
    //   // console.log(auth.google.photoURL);
    //   if (auth) {
    //     navController.push(LoginPage)

    //   } else {
    //     console.log('not logged in');
    //   }
    // });
  }

  ngOnInit() {
    this.platform.ready().then(() => {
      this.pushUrl();
    });
  }

  pushUrl() {
    // let message1 = Ndef.uriRecord('https://google.com')
    // NFC.share([message1]).then(() => alert('success')).catch(() => alert('error'));
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
}