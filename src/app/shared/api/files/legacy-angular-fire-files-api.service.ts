import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CscFile } from '../storage/cscFile';
import { FilesApiService } from './files-api.service';

@Injectable({
  providedIn: 'root',
})
export class LegacyAngularFireFilesApiService extends FilesApiService {
  _gallery$: Observable<CscFile[]>;
  _files$: Observable<Record<string, CscFile[]>>;

  constructor(private _db: AngularFireDatabase) {
    super();
    this._gallery$ = _db
      .object<CscFile[]>('files/homeSlideshow')
      .valueChanges()
      .pipe(shareReplay());
    this._files$ = _db
      .object<Record<string, CscFile[]>>('files')
      .valueChanges()
      .pipe(shareReplay());
  }

  files$(): Observable<Record<string, CscFile[]>> {
    return this._files$;
  }
  gallery$(): Observable<CscFile[]> {
    return this._gallery$;
  }

  public async setHomeSlideshowFiles(files: CscFile[]): Promise<void> {
    await this._db.object('files/homeSlideshow').set(files);
  }

  public getHomeSlideshowFiles(): Observable<CscFile[]> {
    return this._db.list<CscFile>('files/homeSlideshow').valueChanges();
  }
}
