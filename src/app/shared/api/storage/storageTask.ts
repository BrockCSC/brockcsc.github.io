import { GUID } from 'app/shared/guid';
import { CscFile } from './cscFile';

export class StorageTask {
  file: File;
  name: string;
  url: string;
  progress: number;
  creationDate: string;
  guid: string;
  path: string;

  constructor(file: File) {
    this.file = file;
    this.name = file.name;
    this.creationDate = new Date().toJSON();
    this.progress = 0;
    this.guid = GUID.newGuid();
    this.path = this.createPath();
  }

  public createPath(): string {
    const date: Date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}/${month}/${day}/${this.guid}`;
  }

  public toCscFile(): CscFile {
    return {
      creationDate: this.creationDate,
      name: this.name,
      path: this.path,
      url: this.url,
      guid: this.guid,
    } as CscFile;
  }
}
