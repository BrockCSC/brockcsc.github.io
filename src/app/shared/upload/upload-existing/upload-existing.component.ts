import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CscFile } from 'app/shared/api';
import { NgFor, NgIf } from '@angular/common';
import { InputContainerComponent } from '../../input-container/input-container.component';

@Component({
  selector: 'csc-upload-existing',
  templateUrl: './upload-existing.component.html',
  styleUrls: ['./upload-existing.component.scss'],
  standalone: true,
  imports: [InputContainerComponent, NgFor, NgIf],
})
export class UploadExistingComponent implements OnChanges {
  @Input() data: CscFile[]; // Read when ngOnChanges is triggered.
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() onChange: EventEmitter<CscFile[]> = new EventEmitter<CscFile[]>();
  public existingFiles: ExistingFile[] = [];
  public prevString = '';

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

  public isImage(name: string): boolean {
    const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
    return !!name.match(imageReg);
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
