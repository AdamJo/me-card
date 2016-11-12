import { Component, OnInit } from '@angular/core';

import { Platform, NavController } from 'ionic-angular';
import { NFC, Ndef } from 'ionic-native';

import { AngularFire, AngularFireAuth, FirebaseAuth, FirebaseAuthState, AuthProviders  } from 'angularfire2';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage implements OnInit {

  constructor(
    public platform: Platform,
    public af: AngularFire,
    public navController:NavController,
    public auth$: FirebaseAuth) {
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

  login() {
    this.signIn(AuthProviders.Twitter)
    // this.af.auth.login().then((data) => console.log(data));
    // this.af.database.object('users').set(this.af.auth.getAuth().uid);
  }

  logout() {
     this.af.auth.logout();
  }

  authCheck() {
    console.log(this.af.auth.getAuth())
  }

  signIn(provider: number) {
    return this.auth$.login({provider})
      .catch(error => console.log('ERROR @ AuthService#signIn() :', error));
  }
}