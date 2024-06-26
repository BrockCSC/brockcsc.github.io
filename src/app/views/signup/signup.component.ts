import { NgIf } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { environment } from 'environments/environment';
import {
  DiscordSignUpGoogleFormConfig,
  SignUpGoogleFormConfig,
} from 'environments/types';
import { ButtonDirective } from '../../shared/button/button.directive';
import { InputContainerComponent } from '../../shared/input-container/input-container.component';
import { DISCORD_LINK } from './../../shared/utils/constants';

@Component({
  selector: 'csc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputContainerComponent,
    NgIf,
    ButtonDirective,
    FormsModule,
    RouterLink,
  ],
})
export class SignupComponent {
  public form: UntypedFormGroup;
  discordLink = DISCORD_LINK;

  public signupFormConfig: SignUpGoogleFormConfig;
  public discordInviteFormConfig: DiscordSignUpGoogleFormConfig;
  public submitted: boolean;

  @ViewChild('signupForm') signupForm: ElementRef<HTMLFormElement>;
  @ViewChild('discordInviteForm')
  discordInviteForm: ElementRef<HTMLFormElement>;

  constructor(private _formBuilder: UntypedFormBuilder) {
    this.submitted = false;

    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      student_id: ['', [Validators.required]],
      gender: ['N/A', [Validators.required]],
      email: ['', [Validators.email]],
      program: ['', [Validators.required]],
      number_of_years_member: [0, [Validators.min(0), Validators.max(10)]],
      interests: '',
    });

    this.signupFormConfig = environment.signupForm;

    this.discordInviteFormConfig = environment.discordInviteForm;
  }

  onSubmit(form: UntypedFormGroup) {
    if (form.valid) {
      this.discordInviteForm.nativeElement.submit();
      this.signupForm.nativeElement.submit();
      this.submitted = true;
    }
  }
}
