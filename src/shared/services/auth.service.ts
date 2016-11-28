import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { FirebaseAuth, FirebaseAuthState, AuthProviders, AngularFire  } from 'angularfire2';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthService {
  private authState: FirebaseAuthState = null;
  HAS_LOGGED_IN = 'hasLoggedIn';
  public cardNameList: Array<string> = [];
  public allCards: Array<any> = [];

  constructor(
    public auth$: FirebaseAuth,
    public af: AngularFire,
    public events: Events,
    public storage: Storage) {
    auth$.subscribe((state: FirebaseAuthState) => {
      this.authState = state;
    });
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get id(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  //TODO call auth directly or use storage?
  get email(): string {
    return this.authState.auth.email;
  }

  //TODO call auth directly or use storage?
  get displayName(): string {
    return this.authState.auth.displayName;
  }

  signIn(provider: number): firebase.Promise<FirebaseAuthState> {
    this.events.publish('user:login');
    return this.auth$.login({provider})
      .then((loggedIn) => {
        this.storage.set(this.HAS_LOGGED_IN, true);
        this.af.database.object(`/users/${this.id}`).update(
          {
            displayName: loggedIn.auth.displayName,
            email: loggedIn.auth.email,
            photoUrl: loggedIn.auth.photoURL,
            providerId: loggedIn.auth.providerId
          }
        );
        this.setDisplayName(loggedIn.auth.displayName);
        this.setId(loggedIn.auth.uid);
        this.setEmail(loggedIn.auth.email);
        this.setPhotoUrl(loggedIn.auth.photoURL);
        this.setStuff();

      })
      .catch(error => console.log('ERROR @ AuthService#login() :', error));
  }

  signInWithGithub(): firebase.Promise<FirebaseAuthState> {
    return this.signIn(AuthProviders.Github);
  }

  signInWithGoogle(): firebase.Promise<FirebaseAuthState> {
    return this.signIn(AuthProviders.Google);
  }

  signInWithTwitter(): firebase.Promise<FirebaseAuthState> {
    return this.signIn(AuthProviders.Twitter);
  }

  signInWithFacebook(): firebase.Promise<FirebaseAuthState> {
    return this.signIn(AuthProviders.Facebook);
  }

  signOut(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove(this.id);
    this.events.publish('user:logout');
    this.auth$.logout();
  }

  authDetails(): void {
    console.log(this.authState);
  }

  setDisplayName(displayName) {
    this.storage.set('displayName', displayName);
  }

  setId(id) {
    this.storage.set('id', id);
  }

  setEmail(email) {
    this.storage.set('email', email);
  }

  setPhotoUrl(phtoUrl) {
    this.storage.set('photoUrl', phtoUrl);
  }

  setStuff() {
    this.storage.set('stuff', {one: 'one', two: 'yellow'});
  }

  getDisplayName() {
    return this.storage.get('displayName').then((value) => {
      return value;
    });
  }

  getEmail() {
    return this.storage.get('email').then((value) => {
      return value;
    });
  }

  getPhotoUrl() {
    return this.storage.get('photoUrl').then((value) => {
      return value;
    });
  }

  getCardsLocally() {
    return this.storage.get('cards').then((value) => {
      return value;
    });
  }

  getCardsFirebase() {
    this.af.database.object(`/cards/${this.id}`).subscribe(data => {
      delete data['$key'];
      this.saveCardsLocally(data);
    })
  }

  deleteCard(cardName) {
    return this.af.database.object(`/cards/${this.id}/${cardName}`);
  }

  saveCards(card) {
    this.af.database.object(`/cards/${this.id}/${card.cardName}/`).set(card);
    this.allCards[card.cardName] = card;
    this.saveCardsLocally(this.allCards);
  }

  saveCardsLocally(cards: any[]) {
    this.cardNameList = Object.keys(cards);
    this.storage.set('cards', JSON.stringify(cards));
  }

  loadLocalCards() {
    return this.storage.get('cards').then((value) => {
      this.cardNameList = Object.keys(JSON.parse(value));
      this.allCards = JSON.parse(value);
      return JSON.parse(value);
    });
  }

  hasLoggedIn() {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  }
}
