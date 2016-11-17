import { Component, ViewChild  } from '@angular/core';
import { Events, MenuController,  NavController , Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';
import { AccountPage } from '../account/account';
import { AboutPage } from '../about/about';
import { ContactsPage } from '../contacts/contacts';

import { PageInterface } from '../../shared/models/page-interface.model';
import { AuthService } from '../../shared/services/auth.service';

import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-side-menu',
  templateUrl: 'side-menu.html'
})
export class SideMenuPage {
  @ViewChild('content') nav: NavController;
  rootPage = TabsPage;

  appPages: PageInterface[] = [
    { title: 'Home', component: HomePage, icon: 'home'},
    { title: 'About', component: AboutPage, index: 1, icon: 'information'}
  ]

  loggedInPages: PageInterface[] = [
    { title: 'Account', component: AccountPage, icon: 'person' },
    { title: 'Contacts', component: ContactsPage, icon: 'contacts'},
    { title: 'Setting', component: SettingsPage, icon: 'settings'}
  ];

  loggedOutPages: PageInterface[] = [
    { title: 'Sign Up', component: HomePage, icon: 'home'},
    { title: 'Login', component: AboutPage, icon: 'information'}
  ];
  constructor(public platform: Platform,
    public menu: MenuController,
    public events: Events,
    public auth: AuthService,) {
      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        StatusBar.styleDefault();
        Splashscreen.hide();
      });
      this.listenToLoginEvents();
    }

  ionViewDidLoad() {
    console.log('Hello SideMenuPage Page');
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

  switch(one) {
    console.log(one);
  }

}
