import { Injectable } from '@angular/core';
import {
  Database,
  DatabaseReference,
  child,
  equalTo,
  list,
  orderByChild,
  push,
  query,
  ref,
  remove,
  update,
} from '@angular/fire/database';
import { Observable, map } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { Exec } from './exec';
import { ExecApiService } from './exec.service';

@Injectable({
  providedIn: 'root',
})
export class AngularFireExecApiService extends ExecApiService {
  private ref: DatabaseReference;
  private currentExecs$: Observable<Exec[]>;
  private previousExecs$: Observable<Exec[]>;

  constructor(db: Database, private _storageService: StorageService) {
    super();
    this.ref = ref(db, '/exec');
    this.currentExecs$ = list(
      query(this.ref, orderByChild('isCurrentExec'), equalTo(true))
    ).pipe(
      map((changes) =>
        changes.map(
          (change) =>
            ({
              $key: change.snapshot.key,
              ...change.snapshot.val(),
            } as Exec)
        )
      )
    );
    this.previousExecs$ = list(
      query(this.ref, orderByChild('isCurrentExec'), equalTo(false))
    ).pipe(
      map((changes) =>
        changes.map(
          (change) =>
            ({
              $key: change.snapshot.key,
              ...change.snapshot.val(),
            } as Exec)
        )
      )
    );
  }

  async addExec(exec: Exec): Promise<void> {
    await push(this.ref, exec);
  }

  getCurrentExecs(): Observable<Exec[]> {
    return this.currentExecs$;
  }

  getPreviousExecs(): Observable<Exec[]> {
    return this.previousExecs$;
  }

  async updateExec(key: string, value: Exec): Promise<void> {
    await update(child(this.ref, key), value);
  }

  async removeExecs(execs: Exec[]): Promise<void> {
    await Promise.all(execs.map((exec) => this.removeExec(exec)));
  }

  private async removeExec(exec: Exec): Promise<void> {
    const image = exec.image;

    if (image !== undefined) {
      await this._storageService.removeFile(image.path, image.name);
    }

    await this.removeExecByKey(exec.$key);
  }

  private async removeExecByKey(key: string): Promise<void> {
    await remove(child(this.ref, key));
  }
}
