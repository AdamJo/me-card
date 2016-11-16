import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the DonateBuy page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-donate-buy',
  templateUrl: 'donate-buy.html'
})
export class DonateBuyPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello DonateBuyPage Page');
  }

}
