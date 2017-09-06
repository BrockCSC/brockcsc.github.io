import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/of';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
    private _path;

    constructor(private _auth: AngularFireAuth, private _db: AngularFireDatabase) {
        this._path = 'user';
    }

    public googleLogin(): firebase.Promise<any> {
        return this._auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }

    public logout(): firebase.Promise<any> {
        return this._auth.auth.signOut();
    }

    public getUser(): Observable<User> {
        return this._auth.authState.switchMap(auth => {
            if (auth) {
                return this._db.object(`${this._path}/${auth.uid}`)
                    .map(user => {
                        if (user.admin === null) {
                            user.admin = false;
                        }
                        return user;
                    });
            }
            return Observable.of(null);
        }).take(1);
    }
}

interface User {
    admin: boolean;
}
