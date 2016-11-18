import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the CreateCard page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create-card',
  templateUrl: 'create-card.html'
})
export class CreateCardPage {

  constructor(public navCtrl: NavController) {}

  ionViewDidLoad() {
    console.log('Hello CreateCardPage Page');
  }

}
