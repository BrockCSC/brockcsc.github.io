import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  QueryFn,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { listWithKeys } from '../util';
import { Exec } from './exec';
import { ExecApiService } from './exec.service';

@Injectable({
  providedIn: 'root',
})
export class LegacyAngularFireExecApiService extends ExecApiService {
  execs: AngularFireList<Exec>;
  _path: string;

  constructor(
    private _db: AngularFireDatabase,
    private _storageService: StorageService
  ) {
    super();
    this._path = '/exec';
    this.execs = _db.list(this._path);
  }

  private queryExec(queryFn: QueryFn): AngularFireList<Exec> {
    return this._db.list(this._path, queryFn);
  }

  async addExec(exec: Exec): Promise<void> {
    await this.execs.push(exec);
  }

  getCurrentExecs(): Observable<Exec[]> {
    return listWithKeys(
      this.queryExec((ref) => {
        return ref.orderByChild('isCurrentExec').equalTo(true);
      })
    );
  }

  getPreviousExecs(): Observable<Exec[]> {
    return listWithKeys(
      this.queryExec((ref) => {
        return ref.orderByChild('isCurrentExec').equalTo(false);
      })
    );
  }

  async updateExec(key: string, value: Exec): Promise<void> {
    await this.execs.update(key, value);
  }

  async removeExecs(execs: Exec[]): Promise<void> {
    await Promise.all(execs.map((exec) => this.removeExec(exec)));
  }

  private removeExec(exec: Exec): Promise<void> {
    const image = exec.image;

    if (image !== undefined) {
      this._storageService.removeFile(image.path, image.name);
    }

    return this.removeExecByKey(exec.$key);
  }

  private removeExecByKey(key: string): Promise<void> {
    return this.execs.remove(key);
  }
}
