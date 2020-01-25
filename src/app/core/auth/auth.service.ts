
import { of as observableOf, Observable, BehaviorSubject } from 'rxjs';

import { map, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
    private _path;

    constructor(private _auth: AngularFireAuth, private _db: AngularFireDatabase) {
        this._path = 'user';
    }

    public googleLogin(): Promise<any> {
        return this._auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    public logout(): Promise<any> {
        return this._auth.auth.signOut();
    }

    public get authenticated(): Observable<firebase.User> {
        return this._auth.authState;
    }

    public getUser(): Observable<User> {
        return this._auth.authState.pipe(
            switchMap(auth => {
                if (auth) {
                    return this.getUserById(auth.uid);
                }
                return observableOf(null);
            }));
    }

    public getUserById(uid: string): Observable<User> {
        return (this._db.object(`${this._path}/${uid}`).valueChanges() as Observable<User>)
            .pipe(
                map(user => {
                    if (user.admin === null) {
                        user.admin = false;
                    }
                    return user;
                }));
    }
}

interface User {
    admin: boolean;
}
