import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CscFile } from 'app/shared/api';
import { UploadService } from 'app/shared/upload/upload.service';
import { Observable } from 'rxjs';
import { FilesApiService } from './../../shared/api/files/files-api.service';
import { UploadComponent } from './../../shared/upload/upload.component';
import { AsyncPipe } from '@angular/common';
import { ButtonComponent } from '../../shared/button/button.component';
import { ButtonDirective } from '../../shared/button/button.directive';
import { UploadComponent as UploadComponent_1 } from '../../shared/upload/upload.component';
import { InputContainerComponent } from '../../shared/input-container/input-container.component';

@Component({
  selector: 'csc-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputContainerComponent,
    UploadComponent_1,
    ButtonDirective,
    ButtonComponent,
    AsyncPipe,
  ],
})
export class FilesComponent implements OnInit {
  form: UntypedFormGroup;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _db: AngularFireDatabase,
    public filesApi: FilesApiService
  ) {}

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      homeSlideshow: new UntypedFormControl([]),
    });
  }

  async update() {
    await this._db.object('files').set(this.form.value);
    this.form.reset();
  }
}
