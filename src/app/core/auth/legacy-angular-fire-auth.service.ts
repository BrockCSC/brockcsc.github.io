import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService, User } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LegacyAngularFireAuthService extends AuthService {
  private _path;

  constructor(
    private _auth: AngularFireAuth,
    private _db: AngularFireDatabase
  ) {
    super();
    this._path = 'user';
  }

  async googleLogin(): Promise<void> {
    await this._auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  async logout(): Promise<void> {
    await this._auth.signOut();
  }

  getUser(): Observable<User> {
    return this._auth.authState.pipe(
      switchMap((auth) => {
        if (auth) {
          return this.getUserById(auth.uid);
        }
        return of(null);
      })
    ) as Observable<User>;
  }

  private getUserById(uid: string): Observable<User> {
    return this._db
      .object(`${this._path}/${uid}`)
      .snapshotChanges()
      .pipe(
        map((obj) => {
          const data = obj.payload.val() as any;
          if (data.admin === null) {
            data.admin = false;
          }
          return data;
        })
      );
  }
}
