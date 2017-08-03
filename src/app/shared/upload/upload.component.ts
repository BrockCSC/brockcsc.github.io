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
    files: FileList;
    fileHover: boolean;
    storageTasks: StorageTask[] = [];

    constructor(private _storageService: StorageService) {
        super();
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
        const dataTransfer = $event.dataTransfer;
        this.files = dataTransfer.files;
        this.uploadFiles();
        this.fileHover = false;
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

    public getFiles(): CscFile[] {
        return this.storageTasks.map((task: StorageTask) => task.toCscFile());
    }
}
