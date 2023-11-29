import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { environment } from 'environments/environment';
import { ExecApplicationFormConfig } from 'environments/types';

@Component({
  providers: [UntypedFormBuilder],
  selector: 'csc-execapplications',
  templateUrl: './execapplications.component.html',
  styleUrls: ['./execapplications.component.scss'],
})
export class ExecApplicationsComponent {
  public form: UntypedFormGroup;
  public googleForm: ExecApplicationFormConfig;
  public submitted: boolean;
  @ViewChild('execApplicationForm', { static: true })
  execApplicationForm: ElementRef<HTMLFormElement>;

  constructor(private _formBuilder: UntypedFormBuilder) {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      intrCscExec: ['', Validators.required],
      skills: ['', Validators.required],
      workshop: ['', Validators.required],
      years: ['', Validators.required],
      currentYear: ['', Validators.required],
    });

    this.submitted = false;
    this.googleForm = environment.execApplicationForm;
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.submitted = true;
      this.execApplicationForm.nativeElement.submit();
      this.execApplicationForm.nativeElement.reset();
    }
  }
}
