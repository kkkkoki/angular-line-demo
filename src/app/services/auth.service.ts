import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { UserData } from '../interfaces/user-data';
import { map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
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
