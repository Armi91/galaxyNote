import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DbService } from './db.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;
  userSnapshot$;
  isLogged = false;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState
    .pipe(
      switchMap(user => {
        if (user) {
          this.isLogged = true;
          return this.afs.doc(`users/${user.uid}`).valueChanges();
        } else {
          this.isLogged = false;
          return of(null);
        }
      })
    );
    this.userSnapshot$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc(`users/${user.uid}`).snapshotChanges();
        } else {
          return of(null);
        }
      })
    );
  }


  isLoggedIn() {
    return this.afAuth.authState;
  }

  login(email) {
    const password = 'GalaxyNote10';
    return this.afAuth.auth.signInWithEmailAndPassword(email, password).then((res) => {
      this.isLogged = true;
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  register(email?) {
    if (!email) {
      const ran = '_' + Math.random().toString(36).substr(2, 9);
      email = ran + '@mail.com';
    }
    const password = 'GalaxyNote10';
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password).catch((err) => {
      return err;
    }).then((res) => {
      this.isLogged = true;
      return res;
    });
  }
}
