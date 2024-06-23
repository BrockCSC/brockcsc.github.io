import { Injectable } from '@angular/core';
import {
  Database,
  DatabaseReference,
  child,
  listVal,
  objectVal,
  push,
  ref,
  set,
} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { FormInfo, emptyForm, randomUid } from './form';
import { FormApiService } from './form-api.service';

@Injectable({
  providedIn: 'root',
})
export class AngularFireFormApiService extends FormApiService {
  private formsRef: DatabaseReference;
  private entriesRef: DatabaseReference;

  constructor(db: Database) {
    super();
    this.formsRef = ref(db, '/form');
    this.entriesRef = ref(db, '/entry');
  }

  async setForm(
    formInfo: FormInfo,
    formId: string = randomUid(10)
  ): Promise<void> {
    await set(child(this.formsRef, formId), formInfo);
  }

  async addEntry(formId: string, entry: any): Promise<void> {
    await push(child(this.entriesRef, formId), entry);
  }

  getForm(formId: string): Observable<FormInfo> {
    return objectVal<FormInfo>(child(this.formsRef, formId)).pipe(
      map((value) => (!value ? emptyForm() : value))
    );
  }

  getFormOnce(formId: string): Observable<FormInfo> {
    return objectVal<FormInfo>(child(this.formsRef, formId)).pipe(
      take(1),
      map((value) => (!value ? emptyForm() : value))
    );
  }

  getAllEntries(formId: string): Observable<any[]> {
    return listVal<any>(child(this.entriesRef, formId));
  }
}
