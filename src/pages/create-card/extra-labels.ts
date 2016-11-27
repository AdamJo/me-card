import { Validators } from '@angular/forms';

export const Address = {
  'city': {
    label: 'City',
    formControlName: 'city',
    type: 'text',
    name: 'city',
    validators: []
  },
  'zip': {
    label: 'Postal / Zip Code',
    formControlName: 'zip',
    type: 'text',
    name: 'zip',
    validators: []
  },
  'country': {
    label: 'Country',
    formControlName: 'country',
    type: 'text',
    name: 'country',
    validators: []
  }
}

export const ExtraLabels = {
  'homeNumber': {
    label: 'Home Number',
    formControlName: 'homeNumber',
    type: 'tel',
    name: 'phone',
    validators: [Validators.maxLength(20)]
  },
  'mobileNumber': {
    label: 'Mobile Number',
    formControlName: 'mobileNumber',
    type: 'tel',
    name: 'phone',
    validators: [Validators.maxLength(20)]
  },
  'workNumber': {
    label: 'Work Number',
    formControlName: 'workNumber',
    type: 'tel',
    name: 'phone',
    validators: [Validators.maxLength(20)]
  },
  'personalNumber': {
    label: 'Personal Number',
    formControlName: 'personalNumber',
    type: 'email',
    name: '',
    validators: [Validators.maxLength(20)]
  },
  'company': {
    label: 'Company Name',
    formControlName: 'company',
    type: 'text',
    name: '',
    validators: [Validators.maxLength(40)]
  },
  'address': {
    label: 'Address',
    formControlName: 'address',
    type: 'text',
    name: 'address',
    validators: []
  },
  'description': {
    label: 'Description',
    formControlName: 'description',
    type: 'text',
    name: '',
    validators: []
  },
  'faxNumber': {
    label: 'Fax Number',
    formControlName: 'faxNumber',
    type: 'text',
    name: '',
    validators: []
  },
  'title': {
    label: 'Position / Title',
    formControlName: 'title',
    type: 'text',
    name: '',
    validators: []
  },
  'tools': {
    label: 'Tools',
    formControlName: 'tools',
    type: 'text',
    name: '',
    validators: []
  },
  'website': {
    label: 'Website',
    formControlName: 'website',
    type: 'text',
    name: '',
    validators: []
  }
}
