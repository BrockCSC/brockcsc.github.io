import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { shareReplay, take } from 'rxjs/operators';
import { CscFile } from '../storage/cscFile';

@Injectable({
  providedIn: 'root',
})
export class FilesApiService {
  gallery$: Observable<CscFile[]>;
  files$: Observable<Record<string, CscFile[]>>;
  constructor(private _db: AngularFireDatabase) {
    this.gallery$ = _db
      .object<CscFile[]>('files/homeSlideshow')
      .valueChanges()
      .pipe(shareReplay());
    this.files$ = _db
      .object<Record<string, CscFile[]>>('files')
      .valueChanges()
      .pipe(shareReplay());
  }
}
