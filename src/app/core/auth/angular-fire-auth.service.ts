import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  authState,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';
import { Database, objectVal, ref } from '@angular/fire/database';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService, User } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AngularFireAuthService extends AuthService {
  private _path = 'user';

  constructor(private auth: Auth, private db: Database) {
    super();
  }

  async googleLogin(): Promise<void> {
    await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async logout(): Promise<void> {
    return await signOut(this.auth);
  }

  getUser(): Observable<User> {
    return authState(this.auth).pipe(
      switchMap((auth) => {
        if (auth) {
          return this.getUserById(auth.uid);
        }
        return of(null);
      })
    );
  }

  private getUserById(uid: string): Observable<User> {
    return objectVal<User>(ref(this.db, `${this._path}/${uid}`)).pipe(
      map((user) => {
        user.admin ??= false;
        return user;
      })
    );
  }
}
