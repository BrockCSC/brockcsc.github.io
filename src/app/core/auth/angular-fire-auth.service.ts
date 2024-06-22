import { Injectable } from '@angular/core';
import { Auth, authState, signInWithPopup, signOut } from '@angular/fire/auth';
import { Database, object, ref } from '@angular/fire/database';
import { GoogleAuthProvider } from 'firebase/auth';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService, User } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AngularFireAuthService extends AuthService {
  private _path;

  constructor(private auth: Auth, private db: Database) {
    super();
    this._path = 'user';
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
    return object(ref(this.db, `${this._path}/${uid}`)).pipe(
      map((obj) => {
        const data = obj.snapshot.val() as any;
        if (data.admin === null) {
          data.admin = false;
        }
        return data;
      })
    );
  }
}
