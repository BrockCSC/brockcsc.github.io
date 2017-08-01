import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { CscFile } from './cscFile';
import * as firebase from 'firebase';

@Injectable()
export class FileService {
    _files: FirebaseListObservable<Event[]>;
    _path: string;

    constructor(private _db: AngularFireDatabase) {
        this._path = '/files';
        this._files = _db.list(this._path);
    }

    public addFile(file: CscFile): firebase.database.ThenableReference {
        return this._files.push(file);
    }

    public deleteFile(key: string): firebase.Promise<void> {
        return this._files.remove(key);
    }

    public deleteFileStorage(path: string, filename: string): firebase.Promise<void> {
        return firebase.storage().ref(path).child(filename).delete();
    }
}
