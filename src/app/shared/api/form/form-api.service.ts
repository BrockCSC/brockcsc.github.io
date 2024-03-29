import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
  QueryFn,
} from '@angular/fire/compat/database';
import { Observable, Subscribable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { emptyForm, FormInfo, randomUid } from './form';

@Injectable({
  providedIn: 'root',
})
export class FormApiService {
  _formPath = '/form';
  _entryPath = '/entry';
  forms: AngularFireList<FormInfo>;
  entries: AngularFireList<any>;

  constructor(private _db: AngularFireDatabase) {
    this.forms = this._db.list(this._formPath);
    this.entries = this._db.list(this._entryPath);
  }

  setForm(formInfo: FormInfo, formId: string = randomUid(10)) {
    return this.forms.set(formId, formInfo);
  }

  addEntry(formId: string, entry: any) {
    return this._db.list(`${this._entryPath}/${formId}/`).push(entry);
  }

  private getFormObject(formId: string): AngularFireObject<FormInfo> {
    return this._db.object(`${this._formPath}/${formId}`);
  }

  getForm(formId: string): Subscribable<FormInfo> {
    return this.getFormObject(formId)
      .valueChanges()
      .pipe(map((value) => (!value ? emptyForm() : value)));
  }

  getFormOnce(formId: string): Subscribable<FormInfo> {
    return this.getFormObject(formId)
      .valueChanges()
      .pipe(take(1))
      .pipe(map((value) => (!value ? emptyForm() : value)));
  }

  getAllEntries(formId: string): Observable<any[]> {
    return this._db.list(`${this._entryPath}/${formId}/`).valueChanges();
  }
}
