import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CscFile } from 'app/shared/api';
import { UploadService } from 'app/shared/upload/upload.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'csc-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
})
export class FilesComponent implements OnInit {
  form: FormGroup;
  dbPath = 'files';
  files$: Observable<CscFile[]>;

  constructor(
    private _formBuilder: FormBuilder,
    private _db: AngularFireDatabase,
    private _uploadService: UploadService
  ) {
    this.files$ = _db.list<CscFile>(this.dbPath).valueChanges();
  }

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      files: new FormControl([]),
    });
  }

  async update() {
    await this._db.object(this.dbPath).set(this.form.value.files);
    this._uploadService.clearFiles();
  }
}
