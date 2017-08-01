import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Upload } from 'app/shared/upload';
import { FileService, CscFile } from 'app/shared/api';
import * as firebase from 'firebase';

@Injectable()
export class UploadService {
    _files: FirebaseListObservable<Upload[]>;
    _base: string;
    _storageRef: firebase.storage.Reference;

    constructor(private _db: AngularFireDatabase, private _fileService: FileService) {
        this._base = '/files';
        this._files = this._db.list(this._base);
        this._storageRef = firebase.storage().ref();
    }

    public pushUpload(file: Upload): void {
        const upload = this._storageRef.child(`${file.path}/${file.name}`).put(file.file);

        upload.on(firebase.storage.TaskEvent.STATE_CHANGED, {
            next: (snapshot: firebase.storage.UploadTaskSnapshot) => {
                file.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            error: (error: Error) => {
                console.log(`Error uploading: ${file.name}.`);
                console.error(error);
            },
            complete: () => {
                file.url = upload.snapshot.downloadURL;
                this.pushToDb(file);
            }
        });
    }

    private pushToDb(file: Upload): void {
        const uploadObject = {
            'creationDate': file.creationDate,
            'name': file.name,
            'url': file.url,
            'path': file.path
        };

        this._fileService.addFile(uploadObject as CscFile).then(res => {
            file.$key = res.key;
        });
    }

    public createUpload(file: File): Upload {
        return new Upload(file);
    }

}
