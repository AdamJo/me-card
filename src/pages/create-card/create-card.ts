import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { Card } from '../../shared/models/card.model'

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
  card: Card = {
    cardTypeName: '',
    firstName: '',
    lastName: '',
    displayName: '',
    resume: false
  };
  cardForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }
  ionViewLoaded() {
    // this.cardForm = this.formBuilder.group({
    //   title: ['', Validators.required],
    //   description: [''],
    // });
  }

  buildForm(): void {
    this.cardForm = this.formBuilder.group({
      'firstName': [this.card.firstName, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(35)
        ]
      ],
      'lastName': [this.card.lastName, [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(35)
        ]
      ],
      'displayName': [this.card.displayName, [
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

  onSubmit() {
    console.log(this.card)
  }


}
