import { Component, ViewChild, ElementRef, QueryList } from '@angular/core';
import { NavController, NavParams, ActionSheetController, AlertController, ModalController, ViewController } from 'ionic-angular';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Card } from '../../shared/models/card.model'

import { AuthService } from '../../shared/services/auth.service'

import { ExtraLabels } from './extra-labels';

import { ModalContentPage } from './modal'


@Component({
  selector: 'page-create-card',
  templateUrl: 'create-card.html'
})

export class CreateCardPage {
  @ViewChild('formThis') please: ElementRef;

  inputs: Array<any> = [];

  alert: any;

  cardType: string = "business";
  label: string = "";

  testRadioOpen: boolean;
  testRadioResult;

  card: Card = {
    cardName: '',
    displayName: '',
    email: ''
  };
  cardForm: FormGroup;
  tabBarElement:any;

  constructor(
    private formBuilder: FormBuilder,
    public auth: AuthService,
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController) {
    this.tabBarElement = document.querySelector('.tabbar');
    this.card.email = navParams.get('email');
    this.card.displayName = navParams.get('displayName');
    this.card.cardName = navParams.get('cardName');

    console.log(viewCtrl.data)
    console.log(navParams);
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
      'displayName': [this.card.displayName, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(70)
        ]
      ],
      'email': [this.card.email, [
          this.validateEmail,
          Validators.minLength(5),
          Validators.maxLength(255)
        ]
      ],
      'cardName': [this.card.cardName, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(70)
        ]
      ]
    });
  }

  onSubmit({ value, valid }: { value: Card, valid: boolean })  {
    this.auth.saveCards(value);
    console.log(value, valid);
  }

  getCard() {
    this.auth.getCards();
  }

  // http://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html
  validateEmail(c: FormControl) {
    // http://emailregex.com/
    let EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i

    return EMAIL_REGEXP.test(c.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }

  testButton() {
    console.log(this.label);
  }

  createAlert() {
    this.alert = this.alertCtrl.create();
    this.alert.setTitle('Labels');

    for (let prop in ExtraLabels) {
      this.alert.addInput({
        type: 'checkbox',
        label: ExtraLabels[prop].label,
        value: ExtraLabels[prop].formControlName
      })
    }

    this.alert.addButton('Cancel');
    this.alert.addButton({
      text: 'Ok',
      handler: (data: Array<string>) => {
        for (let index = 0, len = data.length; index < len; index++) {
          this.cardForm
            .addControl(
              data[index],
              new FormControl('', ExtraLabels[data[index]].validators));
          this.inputs.push(ExtraLabels[data[index]]);     
        }

        this.testRadioOpen = false;
        this.testRadioResult = data;
      }
    });
  }

  showAlertCheckbox() {
    this.createAlert();
    this.alert.present().then(() => {
      this.testRadioOpen = true;
    });
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
        }
      }
    })
    modal.present();
  }
}
