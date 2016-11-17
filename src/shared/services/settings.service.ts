import { AngularFire } from 'angularfire2';
import { Injectable } from '@angular/core'

@Injectable()
export class SettingsService {

  constructor(public af:AngularFire) {
    
  }

  saveSettings():void {}
  getUserPortrait(): void {}
  saveUserPortrait(): void {}
}
