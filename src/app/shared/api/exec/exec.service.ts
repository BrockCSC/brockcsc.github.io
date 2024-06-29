import { Observable } from 'rxjs';
import { Exec } from './exec';

export abstract class ExecApiService {
  abstract addExec(exec: Exec): Promise<void>;
  abstract getCurrentExecs(): Observable<Exec[]>;
  abstract getPreviousExecs(): Observable<Exec[]>;
  abstract updateExec(key: string, value: Exec): Promise<void>;
  abstract removeExecs(execs: Exec[]): Promise<void>;
}
