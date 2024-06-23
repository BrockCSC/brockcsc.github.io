import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FormInfo, emptyForm, randomUid } from './form';
import { FormApiService } from './form-api.service';

@Injectable({
  providedIn: 'root',
})
export class LegacyAngularFireFormApiService extends FormApiService {
  _formPath = '/form';
  _entryPath = '/entry';
  forms: AngularFireList<FormInfo>;
  entries: AngularFireList<any>;

  constructor(private _db: AngularFireDatabase) {
    super();
    this.forms = this._db.list(this._formPath);
    this.entries = this._db.list(this._entryPath);
  }

  async setForm(
    formInfo: FormInfo,
    formId: string = randomUid(10)
  ): Promise<void> {
    await this.forms.set(formId, formInfo);
  }

  async addEntry(formId: string, entry: any): Promise<void> {
    await this._db.list(`${this._entryPath}/${formId}/`).push(entry);
  }

  private getFormObject(formId: string): AngularFireObject<FormInfo> {
    return this._db.object(`${this._formPath}/${formId}`);
  }

  getForm(formId: string): Observable<FormInfo> {
    return this.getFormObject(formId)
      .valueChanges()
      .pipe(map((value) => (!value ? emptyForm() : value)));
  }

  getFormOnce(formId: string): Observable<FormInfo> {
    return this.getFormObject(formId)
      .valueChanges()
      .pipe(take(1))
      .pipe(map((value) => (!value ? emptyForm() : value)));
  }

  getAllEntries(formId: string): Observable<any[]> {
    return this._db.list(`${this._entryPath}/${formId}/`).valueChanges();
  }
}
