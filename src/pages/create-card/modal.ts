import { Component } from '@angular/core';

import { Platform, NavParams, ViewController } from 'ionic-angular';

import { ExtraLabels } from './extra-labels'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Description
        </ion-title>
        <ion-buttons start>
          <button style="font-size: 20px;" showWhen="android,windows" ion-button (click)="dismiss()">
            <ion-icon name="md-close"></ion-icon>
          </button>
          <button style="font-size: 20px;" showWhen="ios" ion-button (click)="dismiss()">
            <span color="primary" >Cancel</span>
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
            <ion-checkbox checked="false" [formControlName]="label.formControlName"></ion-checkbox>
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
      if (params.get('labelsInUse').indexOf(prop) === -1) {
        this.labelsForm.addControl(prop, new FormControl(false))
        this.labels.push(ExtraLabels[prop])
      }
    }
  }

  dismiss() {
    this.viewCtrl.dismiss()
  }

  submitDismiss({ value, valid }: { value: any, valid: boolean }) {
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