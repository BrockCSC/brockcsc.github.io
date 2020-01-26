import { AngularFireObject } from 'angularfire2/database';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
import { AngularFireList } from '@angular/fire/database';

export const listWithKeys = <T>(obs: AngularFireList<T>): Observable<T[]> => {
    return obs.snapshotChanges().pipe(map(items => {
        return items.map(a => {
            const data = a.payload.val() as any;
            const $key = a.payload.key;
            return { $key, ...data };
        });
    }));
};

export const objectWithKeys = <T>(obs: AngularFireObject<T>): Observable<T> => {
    return obs.snapshotChanges().pipe(a => {
        const data = a.payload.val() as any;
        const $key = a.payload.key;
        return { $key, ...data };
    });
};
