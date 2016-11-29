import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MyApp } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { NFCPage } from '../pages/nfc/nfc';
import { AboutPage } from '../pages/about/about';
import { AccountPage } from '../pages/account/account';
import { DonateBuyPage } from '../pages/donate-buy/donate-buy';
import { ContactsPage } from '../pages/contacts/contacts';
import { LoginOptionsPage } from '../pages/login-options/login-options';
import { CreateCardPage } from '../pages/create-card/create-card';
import { ViewEditCardPage } from '../pages/view-edit-card/view-edit-card';

import { ContentModal } from '../modals/contact.modal';
import { ContactCardModal } from '../modals/contact-card.modal';
import { CreateCardModal } from '../modals/create-card.modal';

import { CamelCaseToHeaderPipe } from '../pipes/camel-case-to-header' 

import { TabsPage } from '../pages/tabs/tabs';
import { TabsLoggedOutPage } from '../pages/tabs-logged-out/tabs-logged-out';

import { AngularFireModule, AuthMethods } from 'angularfire2';

import { AuthService } from '../shared/services/auth.service'


const firebaseConfig = {
  apiKey: 'AIzaSyDrRnguFUwKGBzaTOcBcj-bC0vBxx6sDao',
  authDomain: 'me-card.firebaseapp.com',
  databaseURL: 'https://me-card.firebaseio.com',
  storageBucket: 'me-card.appspot.com',
  messagingSenderId: "158994092281"
};

const myFirebaseAuthConfig = {
  method: AuthMethods.Popup
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage,
    NFCPage,
    AccountPage,
    AboutPage,
    TabsPage,
    ContactsPage,
    TabsLoggedOutPage,
    DonateBuyPage,
    LoginOptionsPage,
    CreateCardPage,
    ViewEditCardPage,
    CreateCardModal,
    ContentModal,
    ContactCardModal,
    CamelCaseToHeaderPipe
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig ),
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SettingsPage,
    NFCPage,
    AccountPage,
    AboutPage,
    TabsPage,
    ContactsPage,
    TabsLoggedOutPage,
    DonateBuyPage,
    LoginOptionsPage,
    CreateCardPage,
    ViewEditCardPage,
    CreateCardModal,
    ContentModal,
    ContactCardModal
  ],
  providers: [AuthService, Storage]
})

export class AppModule {}
