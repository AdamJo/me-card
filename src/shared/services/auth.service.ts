import { Events } from 'ionic-angular';
import { FirebaseAuth, FirebaseAuthState, AuthProviders, AngularFire  } from 'angularfire2';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState = null;

  constructor(
    public auth$: FirebaseAuth,
    public af: AngularFire,
    public events: Events) {
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

  signIn(provider: number): firebase.Promise<FirebaseAuthState> {
    this.events.publish('user:login');
    return this.auth$.login({provider})
      .then((loggedIn) => {
        this.af.database.object(`/users/${this.id}`).update(
          {
            displayName: loggedIn.auth.displayName,
            email: loggedIn.auth.email,
            photoUrl: loggedIn.auth.photoURL,
            providerId: loggedIn.auth.providerId
          }
        );
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
    this.events.publish('user:logout');
    this.auth$.logout();
  }

  authDetails(): void {
    console.log(this.authState);
  }

  saveUser() {}

}
