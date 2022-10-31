import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private afs: AngularFirestore) {
    // this.getUsers();
  }

  countScanned(type) {
    // const collection = this.afs.collection('users');
    // return this.afs.collection(collection.ref, (ref) => {
    //   ref.where(type, '==', true);
    // }).valueChanges();
  }

  getAll() {
    return this.afs.collection('users').valueChanges();
  }

  getUsers() {
    // this.afs.collection('users').valueChanges().subscribe(users => {
    //   const u = JSON.stringify(users);
    //   console.log(u);
    // })
  }
}
