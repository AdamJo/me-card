import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Card } from '../../shared/models/card.model'

import { AuthService } from '../../shared/services/auth.service'

import { ExtraLabels, Extension } from './extra-labels';

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

  edit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public navCtrl: NavController) {

    this.cardList = this.auth.cardNameList;
    this.edit = this.navParams.get('edit');
    this.tabBarElement = document.querySelector('.tabbar');
    this.card.email = navParams.get('email');
    this.card.displayName = navParams.get('displayName');
    this.card.cardName = navParams.get('cardName');
    this.originalCardName = navParams.get('cardName');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ngOnInit() {
    this.buildForm();
    this.tabBarElement.style.display = 'none';
  }

  buildForm(): void {
    this.cardForm = this.formBuilder.group({
      // required
      'cardName': [this.card.cardName, [
          Validators.required,
          ValidateDuplicateCardName(this.edit, this.originalCardName, this.cardList),
          Validators.minLength(1),
          Validators.maxLength(30)
        ]
      ],
      'displayName': [this.card.displayName, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(70)
        ]
      ],
      'email': [this.card.email, [
          ValidateEmail,
          Validators.minLength(5),
          Validators.maxLength(255)
        ]
      ],
      'cardType': [this.card.cardType, [Validators.required]]
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

  testForm() {
    console.log(this.cardForm);
  }

  deleteLabel(value, index) {
    this.inputs.splice(index, 1);
  }

  openModal() {
    let modal = this.modalCtrl.create(ModalContentPage);
    modal.onDidDismiss(data => {
      if (data) {
        for (let index = 0, len = data.length; index < len; index++) {
          this.cardForm
            .addControl(
              data[index],
              new FormControl('', ExtraLabels[data[index]].validators));
          this.inputs.push(ExtraLabels[data[index]]);
          if (ExtraLabels[data[index]].type === 'tel') {
            this.cardForm
              .addControl(
                'ext',
                new FormControl('', Extension.validators));
          }
        }
      }
    })
    modal.present();
  }

  backButton() {
    // this.tabBarElement.style.display = 'block';
    this.navCtrl.setRoot(AccountPage);
  }
}
