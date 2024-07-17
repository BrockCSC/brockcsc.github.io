import { NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { CscFile, StorageService, StorageTask } from 'app/shared/api';
import {
  AbstractValueAccessor,
  CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR,
} from '../abstractValueAccessor';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { UploadExistingComponent } from './upload-existing/upload-existing.component';

@Component({
  selector: 'csc-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR(UploadComponent)],
  standalone: true,
  imports: [NgFor, ProgressBarComponent, NgIf, UploadExistingComponent],
})
export class UploadComponent
  extends AbstractValueAccessor
  implements OnInit, OnChanges
{
  @Input() message = 'Select files or drag here';
  @Input() type = 'single';
  @Input() data: CscFile[];
  @ViewChild('existingUpload') existingFiles: UploadExistingComponent;
  files: FileList;
  fileHover: boolean;
  storageTasks: StorageTask[] = [];
  private dataChanged: boolean;

  constructor(
    private _storageService: StorageService,
    private cd: ChangeDetectorRef
  ) {
    super();
  }

  public writeValue(value) {
    // this gets called when .reset() gets called on the form using this component
    this.storageTasks = [];
    super.propagateChange(this.getFiles());
    this.dataChanged = false;
  }

  ngOnInit() {
    this.fileHover = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    // To make sure initial value of the binded form works
    if (changes.data) {
      this.dataChanged = true;
      this.cd.detectChanges();
    }
    if (this.dataChanged) {
      super.propagateChange(this.getFiles());
      this.dataChanged = false;
    }
  }

  @HostListener('dragover', ['$event'])
  public onDragOver($event: DragEvent): void {
    $event.preventDefault();
    this.fileHover = true;
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave($event: DragEvent): void {
    $event.preventDefault();
    this.fileHover = false;
  }

  @HostListener('drop', ['$event'])
  public onDrop($event: DragEvent): void {
    $event.preventDefault();
    const files = $event.dataTransfer.files;
    this.fileHover = false;
    if (
      this.type === 'single' &&
      (this.storageTasks.length > 0 || files.length > 1)
    ) {
      // Don't want to upload anything if something has already been uploaded or > 1 file
      return;
    }
    this.files = files;
    this.uploadFiles();
  }

  public hasExistingFiles(): boolean {
    return this.data?.length > 0;
  }

  public existingFilesChange(): void {
    super.propagateChange(this.getFiles());
  }

  public uploadFiles(): void {
    for (let i = 0; i < this.files.length; i++) {
      const storageTask: StorageTask = new StorageTask(this.files.item(i));
      this.storageTasks.push(storageTask);
      this._storageService
        .addFile(storageTask)
        .then((uploaded: StorageTask) => {
          super.propagateChange(this.getFiles());
        })
        .catch((error: Error) => {
          console.log('Error encountered while uploading files.');
          console.error(error);
        });
    }
  }

  public removeFile(storageTask: StorageTask): void {
    this._storageService
      .removeFile(storageTask.path, storageTask.name)
      .then(() => {
        const taskIndex = this.storageTasks.indexOf(storageTask);
        this.storageTasks.splice(taskIndex, 1);
        super.propagateChange(this.getFiles());
      })
      .catch((error: Error) => {
        console.log('Error enountered while removing a file');
        console.error(error);
      });
  }

  public getFiles(): CscFile[] | CscFile {
    const newFiles = this.storageTasks.map((task: StorageTask) =>
      task.toCscFile()
    );
    const existingFiles =
      this.existingFiles !== undefined ? this.existingFiles.getFiles() : [];
    const allFiles = existingFiles.concat(newFiles);

    if (this.type === 'single') {
      return allFiles.length > 0 ? allFiles[0] : ({} as CscFile);
    }
    return allFiles;
  }
}
