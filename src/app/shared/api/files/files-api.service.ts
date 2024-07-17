import { Observable } from 'rxjs';
import { CscFile } from '../storage/cscFile';

export abstract class FilesApiService {
  abstract files$(): Observable<Record<string, CscFile[]>>;
  abstract gallery$(): Observable<CscFile[]>;
  abstract setHomeSlideshowFiles(files: CscFile[]): Promise<void>;
  abstract getHomeSlideshowFiles(): Observable<CscFile[]>;
}
