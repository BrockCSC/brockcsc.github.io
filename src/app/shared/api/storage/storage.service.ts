import { StorageTask } from './storageTask';

export abstract class StorageService {
  abstract addFile(storageTask: StorageTask): Promise<StorageTask>;
  abstract removeFile(path: string, filename: string): Promise<void>;
}
