import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-tabs-logged-out',
  templateUrl: 'tabs-logged-out.html'
})
export class TabsLoggedOutPage {
  // set the root pages for each tab
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }
}
