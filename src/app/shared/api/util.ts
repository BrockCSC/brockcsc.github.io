import { AngularFireObject } from '@angular/fire/compat/database';
import { AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const listWithKeys = <T>(obs: AngularFireList<T>): Observable<T[]> => {
  return obs.snapshotChanges().pipe(
    map((items) => {
      return items.map((a) => {
        const data = a.payload.val() as any;
        const $key = a.payload.key;
        return { $key, ...data };
      });
    })
  );
};

export const objectWithKeys = <T>(obs: AngularFireObject<T>): Observable<T> => {
  return obs.snapshotChanges().pipe(
    map((a) => {
      const data = a.payload.val() as any;
      const $key = a.payload.key;
      return { $key, ...data };
    })
  );
};
