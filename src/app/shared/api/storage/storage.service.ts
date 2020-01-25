import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { StorageTask } from './storageTask';

@Injectable()
export class StorageService {
    _storageRef: firebase.storage.Reference;

    constructor(private _db: AngularFireDatabase) {
        this._storageRef = firebase.storage().ref();
    }

    public addFile(storageTask: StorageTask): Promise<StorageTask> {
        const upload = this._storageRef.child(`${storageTask.path}/${storageTask.name}`).put(storageTask.file);

        return new Promise((resolve, reject) => {
            upload.on(firebase.storage.TaskEvent.STATE_CHANGED, {
                next: (snapshot: firebase.storage.UploadTaskSnapshot) => {
                    storageTask.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                },
                error: (error: Error) => {
                    reject(error);
                },
                complete: () => {
                    storageTask.url = upload.snapshot.downloadURL;
                    resolve(storageTask);
                }
            });
        });

    }

    public removeFile(path: string, filename: string): Promise<void> {
        return firebase.storage().ref(path).child(filename).delete();
    }

}
