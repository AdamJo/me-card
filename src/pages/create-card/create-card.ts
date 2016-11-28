import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Card } from '../../shared/models/card.model'

import { AuthService } from '../../shared/services/auth.service'

import { ExtraLabels, Address } from './extra-labels';

import { ModalContentPage } from './modal'

import { AccountPage } from '../account/account'

import { ValidateEmail, ValidateDuplicateCardName } from './custom-validators'

@Component({
  selector: 'page-create-card',
  templateUrl: 'create-card.html'
})

export class CreateCardPage {
  inputs: Array<any> = [];

  alert: any;

  cardType: string;
  label: string = "";

  card: Card = {
    cardName: '',
    displayName: '',
    email: '',
    cardType: 'business' // remove when new ones are saved
  };
  cardForm: FormGroup;
  tabBarElement:any;

  cardList: Array<string> = [];
  originalCardName: string;
  currentLabels: Array<string> = [];

  edit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public navCtrl: NavController) {

    this.cardList = this.auth.cardNameList;
    this.edit = navParams.get('edit');
    this.tabBarElement = document.querySelector('.tabbar');
    this.originalCardName = navParams.get('cardName');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ngOnInit() {
    this.buildForm();
    
    if (this.navParams.get('edit')) {
      for (let prop in this.navParams.data) {
        this.currentLabels.push(prop);
        this.card[prop] = this.navParams.get(prop);
        if (prop !== 'edit' && prop in ExtraLabels) {
          this.cardForm
            .addControl(
              prop,
              new FormControl(this.card[prop], ExtraLabels[prop].validators));
          this.inputs.push(ExtraLabels[prop]);
          if (prop === 'address') {
            this.card['city'] = this.navParams.get('city');
            this.card['zip'] = this.navParams.get('zip');
            this.card['country'] = this.navParams.get('country');
            this.cardForm
              .addControl(
                'city',
                new FormControl(this.card['city'], Address['city'].validators));
            this.cardForm
              .addControl(
                'zip',
                new FormControl(this.card['zip'], Address['zip'].validators));
            this.cardForm
              .addControl(
                'country',
                new FormControl(this.card['coutry'], Address['country'].validators));          
          }
        }
      }
    } else {
      for (let prop in this.navParams.data) {
        this.card[prop] = this.navParams.get(prop);
        
      }
      this.card['cardType'] = 'business';
    }
    this.tabBarElement.style.display = 'none';
  }

  buildForm(): void {
    this.cardForm = this.formBuilder.group({
      // required
      'cardName': [this.navParams.get('cardName'), [
          Validators.required,
          ValidateDuplicateCardName(this.edit, this.originalCardName, this.cardList),
          Validators.minLength(1),
          Validators.maxLength(30)
        ]
      ],
      'displayName': [this.navParams.get('displayName'), [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(70)
        ]
      ],
      'email': [this.navParams.get('email'), [
          ValidateEmail,
          Validators.minLength(5),
          Validators.maxLength(255)
        ]
      ],
      'cardType': [this.navParams.get('cardType'), [Validators.required]]
    });
  }

  onSubmit({ value, valid }: { value: Card, valid: boolean })  {
    for ( let v in value ) {
      let trimmedValue = value[v].trim();
      if (!trimmedValue) {
        delete value[v];
      } else {
        value[v] = trimmedValue;
      }
    }
    this.auth.saveCards(value);
    this.navCtrl.setRoot(AccountPage);
  }

  deleteLabel(value, index) {
    this.inputs.splice(index, 1);
    this.cardForm.removeControl(value);
    if (value === 'address') {
      this.cardForm.removeControl('city');
      this.cardForm.removeControl('zip');
      this.cardForm.removeControl('country'); 
    }
  }

  openModal() {
    let modal = this.modalCtrl.create(ModalContentPage, { labelsInUse: this.currentLabels });
    modal.onDidDismiss(data => {
      if (data) {
        for (let index = 0, len = data.length; index < len; index++) {
          this.cardForm
            .addControl(
              data[index],
              new FormControl('', ExtraLabels[data[index]].validators));
          this.inputs.push(ExtraLabels[data[index]]);

          if (ExtraLabels[data[index]].name === 'address') {
            this.cardForm
              .addControl(
                'city',
                new FormControl('', Address['city'].validators));
            this.cardForm
              .addControl(
                'zip',
                new FormControl('', Address['zip'].validators));
            this.cardForm
              .addControl(
                'country',
                new FormControl('', Address['country'].validators));
          }
        }
      }
    })
    modal.present();
  }

  backButton() {
    this.tabBarElement.style.display = 'flex';
    this.navCtrl.setRoot(AccountPage);
  }
}
