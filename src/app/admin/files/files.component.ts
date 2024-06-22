import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
} from '@angular/forms';
import { ButtonComponent } from '../../shared/button/button.component';
import { ButtonDirective } from '../../shared/button/button.directive';
import { InputContainerComponent } from '../../shared/input-container/input-container.component';
import { FilesApiService } from './../../shared/api/files/files-api.service';
import { UploadComponent } from './../../shared/upload/upload.component';

@Component({
  selector: 'csc-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputContainerComponent,
    UploadComponent,
    ButtonDirective,
    ButtonComponent,
    AsyncPipe,
  ],
})
export class FilesComponent implements OnInit {
  form: UntypedFormGroup;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    public filesApi: FilesApiService
  ) {}

  public ngOnInit(): void {
    this.form = this._formBuilder.group({
      homeSlideshow: new UntypedFormControl([]),
    });
  }

  async update() {
    this.filesApi.setHomeSlideshowFiles(this.form.value.homeSlideshow);
    this.form.reset();
  }
}
