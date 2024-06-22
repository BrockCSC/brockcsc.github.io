import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { environment } from 'environments/environment';
import { ContactFormConfig } from 'environments/types';
import { ButtonDirective } from '../../shared/button/button.directive';
import { NgIf } from '@angular/common';
import { InputContainerComponent } from '../../shared/input-container/input-container.component';

@Component({
  providers: [UntypedFormBuilder],
  selector: 'csc-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputContainerComponent,
    NgIf,
    ButtonDirective,
  ],
})
export class ContactComponent {
  public form: UntypedFormGroup;
  public googleForm: ContactFormConfig;
  public submitted: boolean;
  @ViewChild('contactForm', { static: true })
  contactForm: ElementRef<HTMLFormElement>;

  constructor(private _formBuilder: UntypedFormBuilder) {
    this.form = this._formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
    });

    this.submitted = false;
    this.googleForm = environment.contactForm;
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.submitted = true;
      this.contactForm.nativeElement.submit();
      this.contactForm.nativeElement.reset();
    }
  }
}
