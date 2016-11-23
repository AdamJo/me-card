import { Component } from '@angular/core';

import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

import { ExtraLabels } from './extra-labels'
import { Validators, FormBuilder, FormControl, FormGroup, CheckboxControlValueAccessor } from '@angular/forms';

@Component({
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Description
        </ion-title>
        <ion-buttons start>
          <button ion-button (click)="dismiss()">
            <span color="primary" showWhen="ios">Cancel</span>
            <ion-icon name="md-close" showWhen="android,windows"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <form novalidate [formGroup]="labelsForm" (ngSubmit)="submitDismiss(labelsForm)">
        <button block ion-button type="submit" [disabled]="!labelsForm.valid">Save</button>
        <div *ngFor="let label of labels; let i = index;">
          <ion-item>
            <ion-label>{{label.label}}</ion-label>
            <ion-checkbox color="primary" checked="false" [formControlName]="label.formControlName"></ion-checkbox>
          </ion-item>
        </div>
      </form>
    </ion-content>
`
})
export class ModalContentPage {
  labels: Array<any> = [];
  labelsForm: FormGroup;

  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder) {
    
    this.labelsForm = this.formBuilder.group({}, {validator: this.checkboxRequired});
    for (let prop in ExtraLabels) {
      console.log(prop);
      this.labelsForm.addControl(prop, new FormControl(false))
      this.labels.push(ExtraLabels[prop])
    }
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

  submitDismiss({ value, valid }: { value: any, valid: boolean }) {
    console.log(value, valid);
    let checked = Object.keys(value).filter(data => {
      return value[data]
    });
    this.viewCtrl.dismiss(checked)
  }

checkboxRequired(group: FormGroup) {
  var valid = false;

  for (let checkboxName in group.controls) {
    var val = group.controls[checkboxName].value;
    if (val) {
      valid = true;
      break;
    }
  }

  if (valid) {
    return null;
  }

  return {
    checkboxRequired: true
  };
}
}