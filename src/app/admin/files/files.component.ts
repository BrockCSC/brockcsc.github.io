import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CscFile } from 'app/shared/api';
import { UploadService } from 'app/shared/upload/upload.service';
import { Observable } from 'rxjs';
import { FilesApiService } from './../../shared/api/files/files-api.service';
import { UploadComponent } from './../../shared/upload/upload.component';

@Component({
  selector: 'csc-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
})
export class FilesComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _db: AngularFireDatabase,
    public filesApi: FilesApiService
  ) {}

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      homeSlideshow: new FormControl([]),
    });
  }

  async update() {
    await this._db.object('files').set(this.form.value);
    this.form.reset();
  }
}
