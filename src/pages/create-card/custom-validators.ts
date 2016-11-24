import { FormControl } from '@angular/forms';  
// http://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html
export function ValidateEmail(c: FormControl) {
  // http://emailregex.com/
  let EMAIL_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i

  return EMAIL_REGEXP.test(c.value) ? null : {
    validateEmail: {
      valid: 'Invalid Email Format'
    }
  };
}

export function ValidateDuplicateCardName(edit, originalName, cardList) {
  return function(c: FormControl) {
    if (edit) {
      if (originalName === c.value) {
        return null;
      } else if (cardList.indexOf(c.value) !== -1) {
        return { validateDuplicateCardName: 'Duplicate Card Name' };
      } else {
        return null;
      }
    } else {
      if (this.cardList.indexOf(c.value) !== -1) {
        return { validateDuplicateCardName: 'Duplicate Card Name' };
      } else {
        return null;
      }
    }
  }
};