import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CscFile } from 'app/shared/api';

@Component({
  selector: 'csc-upload-existing',
  templateUrl: './upload-existing.component.html',
  styleUrls: ['./upload-existing.component.scss'],
})
export class UploadExistingComponent implements OnInit, OnChanges {
  @Input() data: CscFile[]; // Read when ngOnChanges is triggered.
  @Output() onChange: EventEmitter<CscFile[]> = new EventEmitter<CscFile[]>();
  public existingFiles: ExistingFile[] = [];
  public prevString = '';

  constructor() {}

  ngOnInit() {}

  public ngOnChanges(change: SimpleChanges): void {
    const files: CscFile[] = change.data.currentValue;
    const currString = JSON.stringify(files);

    if (currString !== this.prevString) {
      this.prevString = currString;
      this.existingFiles = this.getExistingFiles(files);
    }
  }

  public click(existingFile: ExistingFile): void {
    existingFile.click();
    this.onChange.emit(this.getFiles());
  }

  public getFiles(): CscFile[] {
    return this.existingFiles
      .filter((item) => !item.toDelete)
      .map((existingFile) => existingFile.file);
  }

  private getExistingFiles(files: CscFile[]): ExistingFile[] {
    return files.map((file) => {
      return new ExistingFile(file);
    });
  }
}

class ExistingFile {
  public toDelete: boolean;
  constructor(public file: CscFile) {
    this.toDelete = false;
  }

  public click(): void {
    this.toDelete = !this.toDelete;
  }
}
