import { map } from 'rxjs/operators/map';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
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
        return this._auth.authState
            .switchMap(auth => {
                if (auth) {
                    return this.getUserById(auth.uid);
                }
                return Observable.of(null);
            });
    }

    public getUserById(uid: string): Observable<User> {
        return this._db.object(`${this._path}/${uid}`).snapshotChanges().pipe(
            map(obj => {
                const data = obj.payload.val() as any;
                if (data.admin === null) {
                    data.admin = false;
                }
                return data;
            }));
    }
}

interface User {
    admin: boolean;
}