import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the ViewEditCard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-view-edit-card',
  templateUrl: 'view-edit-card.html'
})
export class ViewEditCardPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello ViewEditCardPage Page');
  }

}
