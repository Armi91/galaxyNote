import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private afs: AngularFirestore, private auth: AuthService) { }

  saveUser(data, uid) {
    return this.afs.collection('users').doc(uid).set(data);
  }

  getContent(ofWhat) {
    return this.afs.collection('content').doc(ofWhat).valueChanges();
  }

  updateScanned(uid, place) {
    let toUpdate = {};
    switch (place) {
      case 'camera':
        toUpdate = {'scanned.camera': true};
        break;
      case 'design':
        toUpdate = {'scanned.design': true};
        break;
      case 'efficiency':
        toUpdate = {'scanned.efficiency': true};
        break;
      case 'spen':
        toUpdate = {'scanned.spen': true};
        break;
      case 'prize':
        toUpdate = {'scanned.prize': true};
        break;
    }
    return this.afs.doc(`users/${uid}`).update(toUpdate).then(() => {
      this.afs.doc(`users/${uid}`).update(toUpdate);
    });

  }

  countPointsLeft() {
    return this.auth.userSnapshot$.pipe(
      map((snapshot: any) => {
        const uid = snapshot.payload.id;
        return this.afs.doc(`users/${uid}`).get().toPromise().then(snap => {
          return snap.data();
        });
      })
    ).toPromise();
  }
}
