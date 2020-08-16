import { Injectable } from '@angular/core';
import { StorageTask } from '../api';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  storageTasks: StorageTask[] = [];
  constructor() {}
  clearFiles(): void {
    this.storageTasks = [];
  }
}
