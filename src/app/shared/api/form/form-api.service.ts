import { Observable } from 'rxjs';
import { FormInfo } from './form';

export abstract class FormApiService {
  abstract setForm(formInfo: FormInfo, formId?: string): Promise<void>;
  abstract addEntry(formId: string, entry: any): Promise<void>;
  abstract getForm(formId: string): Observable<FormInfo>;
  abstract getFormOnce(formId: string): Observable<FormInfo>;
  abstract getAllEntries(formId: string): Observable<any[]>;
}
