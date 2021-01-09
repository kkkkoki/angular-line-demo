import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserData } from '../interfaces/user-data';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid: string;
  user$: Observable<UserData> = this.afAuth.user.pipe(
    switchMap((user) => {
      this.uid = user?.uid;
      if (user) {
        return this.db.doc<UserData>(`users/${user.uid}`).valueChanges();
      } else {
        return of(null);
      }
    })
  );

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) { }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
}
