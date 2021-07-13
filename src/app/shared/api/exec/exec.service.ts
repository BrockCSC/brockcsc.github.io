import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  QueryFn,
} from '@angular/fire/database';

import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { listWithKeys } from '../util';
import { Exec } from './exec';

@Injectable()
export class ExecApiService {
  execs: AngularFireList<Exec>;
  _path: string;

  constructor(
    private _db: AngularFireDatabase,
    private _storageService: StorageService
  ) {
    this._path = '/exec';
    this.execs = _db.list(this._path);
  }

  private queryExec(queryFn: QueryFn): AngularFireList<Exec> {
    return this._db.list(this._path, queryFn);
  }

  public addExec(exec: Exec) {
    return this.execs.push(exec);
  }

  public getCurrentExecs(): Observable<Exec[]> {
    return listWithKeys(
      this.queryExec((ref) => {
        return ref.orderByChild('isCurrentExec').equalTo(true);
      })
    );
  }

  public getPreviousExecs(): Observable<Exec[]> {
    return listWithKeys(
      this.queryExec((ref) => {
        return ref.orderByChild('isCurrentExec').equalTo(false);
      })
    );
  }

  public updateExec(key: string, value: Exec): Promise<void> {
    return this.execs.update(key, value);
  }

  public removeExecs(execs: Exec[]): Promise<void[]> {
    return Promise.all(execs.map((exec) => this.removeExec(exec)));
  }

  public removeExec(exec: Exec): Promise<void> {
    const image = exec.image;

    if (image !== undefined) {
      this._storageService.removeFile(image.path, image.name);
    }

    return this.removeExecByKey(exec.$key);
  }

  public removeExecByKey(key: string): Promise<void> {
    return this.execs.remove(key);
  }
}
