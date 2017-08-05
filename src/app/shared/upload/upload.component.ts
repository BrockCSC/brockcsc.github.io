import { Component, OnInit, HostListener, forwardRef, Input } from '@angular/core';
import { StorageService, StorageTask, CscFile } from 'app/shared/api';
import { AbstractValueAccessor, CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR } from '../abstractValueAccessor';

@Component({
    selector: 'csc-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR(UploadComponent)]
})
export class UploadComponent extends AbstractValueAccessor implements OnInit {
    @Input() message = 'Select files or drag here';
    @Input() type = 'single';
    files: FileList;
    fileHover: boolean;
    storageTasks: StorageTask[] = [];

    constructor(private _storageService: StorageService) {
        super();
    }

    public writeValue(value) {
        // this gets called when .reset() gets called on the form using this component
        this.storageTasks = [];
    }

    ngOnInit() {
        this.fileHover = false;
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
        if (this.type === 'single' && (this.storageTasks.length > 0 || files.length > 1)) {
            // Don't want to upload anything if something has already been uploaded or > 1 file
            return;
        }
        this.files = files;
        this.uploadFiles();
    }

    public uploadFiles(): void {
        for (let i = 0; i < this.files.length; i++) {
            const storageTask: StorageTask = new StorageTask(this.files.item(i));
            this.storageTasks.push(storageTask);
            this._storageService.addFile(storageTask)
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
        this._storageService.deleteFile(storageTask.path, storageTask.name)
            .then(() => {
                super.propagateChange(this.getFiles());
                const taskIndex = this.storageTasks.indexOf(storageTask);
                this.storageTasks.splice(taskIndex, 1);
            })
            .catch((error: Error) => {
                console.log('Error enountered while removing a file');
                console.error(error);
            });
    }

    public getFiles(): CscFile[] | CscFile {
        if (this.type === 'single') {
            return this.storageTasks[0].toCscFile();
        }
        return this.storageTasks.map((task: StorageTask) => task.toCscFile());
    }
}
