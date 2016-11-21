import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Card } from '../../shared/models/card.model'

import { AuthService } from '../../shared/services/auth.service'

@Component({
  selector: 'page-create-card',
  templateUrl: 'create-card.html'
})

export class CreateCardPage {
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
    private navParams: NavParams) {
    this.tabBarElement = document.querySelector('.tabbar');
    this.card.email = navParams.get('email');
    this.card.displayName = navParams.get('displayName');
    this.card.cardName = navParams.get('cardName');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.cardForm = this.formBuilder.group({
      'displayName': [this.card.displayName, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(70)
        ]
      ],
      'email': [this.card.email, [
          this.validateEmail
        ]
      ],
      'position': ['', [
          Validators.maxLength(70)
        ]
      ],
      'cardName': [this.card.cardName, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(70)
        ]
      ]
      
      // ,
      // 'alterEgo': [this.hero.alterEgo],
      // 'power':    [this.hero.power, Validators.required]
    });
  }

  onSubmit({ value, valid }: { value: Card, valid: boolean })  {
    console.log(value, valid);
    this.auth.saveCards(value);
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

}
