import { Injectable } from '@angular/core';
import {
  Database,
  DatabaseReference,
  listVal,
  objectVal,
  ref,
  set,
} from '@angular/fire/database';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CscFile } from '../storage/cscFile';
import { FilesApiService } from './files-api.service';

@Injectable({
  providedIn: 'root',
})
export class AngularFireFilesApiService extends FilesApiService {
  _gallery$: Observable<CscFile[]>;
  _files$: Observable<Record<string, CscFile[]>>;
  private homeSlideshowRef: DatabaseReference;

  constructor(db: Database) {
    super();
    this.homeSlideshowRef = ref(db, 'files/homeSlideshow');
    this._gallery$ = listVal<CscFile>(this.homeSlideshowRef).pipe(
      shareReplay()
    );
    this._files$ = objectVal<Record<string, CscFile[]>>(ref(db, 'files')).pipe(
      shareReplay()
    );
  }

  files$(): Observable<Record<string, CscFile[]>> {
    return this._files$;
  }
  gallery$(): Observable<CscFile[]> {
    return this._gallery$;
  }

  public async setHomeSlideshowFiles(files: CscFile[]): Promise<void> {
    await set(this.homeSlideshowRef, files);
  }

  public getHomeSlideshowFiles(): Observable<CscFile[]> {
    return this._gallery$;
  }
}
