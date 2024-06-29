import { Injectable } from '@angular/core';
import {
  Storage,
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { StorageService } from './storage.service';
import { StorageTask } from './storageTask';

@Injectable({
  providedIn: 'root',
})
export class AngularFireStorageService extends StorageService {
  constructor(private storage: Storage) {
    super();
  }

  public async addFile(storageTask: StorageTask): Promise<StorageTask> {
    const { path, name, file } = storageTask;
    const fileRef = ref(this.storage, `${path}/${name}`);
    const upload = uploadBytesResumable(fileRef, file);

    return new Promise((resolve, reject) => {
      upload.on('state_changed', {
        next: (snapshot) => {
          storageTask.progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        error: reject,
        complete: () => {
          getDownloadURL(fileRef).then((downloadURL) => {
            storageTask.url = downloadURL;
            resolve(storageTask);
          });
        },
      });
    });
  }

  public async removeFile(path: string, filename: string): Promise<void> {
    await deleteObject(ref(this.storage, `${path}/${filename}`));
  }
}
