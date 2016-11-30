import { Component, ViewChild  } from '@angular/core';
import { Events, MenuController, Nav , Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { PageInterface } from '../shared/models/page-interface.model';
import { AuthService } from '../shared/services/auth.service';

import { DonateBuyPage } from '../pages/donate-buy/donate-buy';

import { HomePage } from '../pages/home/home';

import { TabsPage } from '../pages/tabs/tabs';
import { TabsLoggedOutPage } from '../pages/tabs-logged-out/tabs-logged-out';

@Component({
  templateUrl: 'app.component.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  // @ViewChild('content') nav: NavController;
  rootPage: any = TabsPage;

  loggedInPages: PageInterface[] = [
    { title: 'Account', component: TabsPage, icon: 'person' },
    { title: 'Contacts', component: TabsPage, index: 1, icon: 'contacts'}
  ];

  loggedOutPages: PageInterface[] = [
    { title: 'Home', component: TabsLoggedOutPage, icon: 'home'},
    { title: 'About', component: TabsLoggedOutPage, index: 1, icon: 'information'}
  ];

  other: PageInterface[] = [
  ]

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

      this.auth.hasLoggedIn().then((hasLoggedIn) => {
        this.enableMenu(hasLoggedIn === true);
        this.rootPage = hasLoggedIn ? TabsPage : HomePage;
      });

      this.listenToLoginEvents();
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
      this.menu.close();
      this.enableMenu(false);
    });
  }

  enableMenu(loggedIn) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  signOut() {
    this.auth.signOut();
    this.nav.setRoot(HomePage);
  }
}
