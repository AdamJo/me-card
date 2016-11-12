import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

// Must export the config
const firebaseConfig = {
  apiKey: 'AIzaSyDrRnguFUwKGBzaTOcBcj-bC0vBxx6sDao',
  authDomain: 'me-card.firebaseapp.com',
  databaseURL: 'https://me-card.firebaseio.com',
  storageBucket: 'me-card.appspot.com',
  messagingSenderId: "158994092281"
};

const myFirebaseAuthConfig = {
  providers: [AuthProviders.Google, AuthProviders.Github],
  method: AuthMethods.Popup
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig ),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: []
})

export class AppModule {}
