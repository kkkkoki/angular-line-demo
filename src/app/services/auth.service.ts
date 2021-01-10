import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserData } from '../interfaces/user-data';
import firebase from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(public afAuth: AngularFireAuth, private db: AngularFirestore, private snackBar: MatSnackBar) { }

  private rejectLogin(error: { massage: any }): void {
    console.error(error.massage);
    this.snackBar.open('ログインエラーです。数秒後にもう一度お試しください');
  }

  googleLogin(): void {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    this.afAuth.signInWithPopup(provider)
      .catch((error) => {
        console.log('catch');
        this.rejectLogin(error);
      });
  }

  logout(): Promise<void> {
    return this.afAuth.signOut();
  }
}
