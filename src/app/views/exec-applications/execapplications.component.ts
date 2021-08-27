import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  providers: [FormBuilder],
  selector: 'csc-execapplications',
  templateUrl: './execapplications.component.html',
  styleUrls: ['./execapplications.component.scss'],
})
export class ExecApplicationsComponent implements OnInit {
  public form: FormGroup;
  public googleForm: GoogleFormConfig;
  public submitted: boolean;
  @ViewChild('execApplicationForm', { static: true }) execApplicationForm;

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      intrCscExec: ['', Validators.required],
      skills: ['', Validators.required],
      workshop: ['', Validators.required],
      years: ['', Validators.required],
    });

    this.submitted = false;
    this.googleForm = {
      url: 'https://docs.google.com/forms/d/e/1FAIpQLSfBrVc9NN552xvMBIQ36_-q8jUuuMvgNdBVn2fTM4bsgkcRqw/formResponse',
      // post parameters for the google form
      ids: {
        name: 'entry.475531787',
        email: 'entry.1544656338',
        intrCscExec: 'entry.1838966879',
        skills: 'entry.39093058',
        workshop: 'entry.22914651',
        years: 'entry.147287492',
      },
    };
  }

  ngOnInit() {}

  public onSubmit(): void {
    if (this.form.valid) {
      this.submitted = true;
      this.execApplicationForm.nativeElement.submit();
      this.execApplicationForm.nativeElement.reset();
    }
  }
}

class GoogleFormConfig {
  url: string;
  ids: {
    name: string;
    email: string;
    intrCscExec: string;
    skills: string;
    workshop: string;
    years: string;
  };
}
