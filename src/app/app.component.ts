import { Component, ViewChild  } from '@angular/core';
import { Events, MenuController, NavController , Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { NFCPage } from '../pages/nfc/nfc';
import { AccountPage } from '../pages/account/account';
import { AboutPage } from '../pages/about/about';
import { ContactsPage } from '../pages/contacts/contacts';

import { PageInterface } from '../shared/models/page-interface.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  templateUrl: 'app.component.html'
})

export class MyApp {
  @ViewChild('content') nav: NavController;
  rootPage = HomePage;

  appPages: PageInterface[] = [
    { title: 'Home', component: HomePage, icon: 'home'},
    { title: 'About', component: AboutPage, index: 1, icon: 'information'}
  ]

  loggedInPages: PageInterface[] = [
    { title: 'Home', component: HomePage, icon: 'home' },
    { title: 'Account', component: AccountPage, index: 1, icon: 'person' },
    { title: 'NFC', component: NFCPage, index: 2, icon: 'card' },
    { title: 'Setting', component: SettingsPage, index: 3, icon: 'settings'},
    { title: 'Contacts', component: ContactsPage, index: 4, icon: 'contacts'}, 
    { title: 'About', component: AboutPage, index: 5, icon: 'information'}
  ];

  loggedOutPages: PageInterface[] = [
    { title: 'Sign Up', component: HomePage, icon: 'home'},
    { title: 'Login', component: AboutPage, icon: 'information'}
  ];

  constructor(
    platform: Platform,
    public menu: MenuController,
    public events: Events,
    public auth: AuthService) {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        StatusBar.styleDefault();
        Splashscreen.hide();
      });
      this.listenToLoginEvents();
  }

  ngAfterViewChecked() {
    if (this.auth.authenticated) {
      this.enableMenu(true);
    } else {
      this.enableMenu(false);
    }
  }

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, {tabIndex: page.index});
    } else {
      this.nav.setRoot(page.component);
    }

    // if (page.logsOut === true) {
    //   // Give the menu time to close before changing to logged out
    //   setTimeout(() => {
    //     this.userData.logout();
    //   }, 1000);
    // }
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }
}
