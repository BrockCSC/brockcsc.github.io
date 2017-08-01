import { Component, OnInit, HostListener } from '@angular/core';
import { UploadService, Upload } from 'app/shared/upload';
import { FileService } from 'app/shared/api';

@Component({
    selector: 'csc-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
    files: FileList;
    fileHover: boolean;
    uploads: Upload[] = [];

    constructor(private _uploadService: UploadService, private _fileService: FileService) { }

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
            const currFile: File = this.files.item(i);
            const upload: Upload = this._uploadService.createUpload(currFile);
            this.uploads.push(upload);
            this._uploadService.pushUpload(upload);
        }
    }

    public removeFile(key: string): void {
        const toDelete: Upload = this.uploads.find(upload => upload.$key === key);
        console.log(toDelete);
        this._fileService.deleteFile(key).then(() => {
            this._fileService.deleteFileStorage(toDelete.path, toDelete.name).catch((err) => {
                console.log(`Error deleting file: ${toDelete.name} from storage.`, err);
            });
            this.uploads.splice(this.uploads.indexOf(toDelete), 1);
        }).catch((err) => {
            console.log(`Error deleting file: ${toDelete.name} from db.`, err);
        });
    }

}
