import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DISCORD_LINK } from './../../shared/utils/constants';

@Component({
  selector: 'csc-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  public form: FormGroup;
  discordLink = DISCORD_LINK;

  public signupFormConfig: SignUpGoogleFormConfig;
  public discordInviteFormConfig: DiscordSignUpGoogleFormConfig;
  public submitted: boolean;

  @ViewChild('signupForm') signupForm;
  @ViewChild('discordInviteForm') discordInviteForm;

  constructor(private _formBuilder: FormBuilder) {
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

    this.signupFormConfig = {
      url:
        'https://docs.google.com/forms/d/16g4HfNf23mC50PitgvU4E-bA-Zwbqn0VgofEqipKjcI/formResponse',
      ids: {
        name: 'entry.1746166300',
        student_id: 'entry.1408207548',
        gender: 'entry.1930392869',
        email: 'entry.232532916',
        program: 'entry.252923868',
        number_of_years_member: 'entry.1045425434',
        interests: 'entry.1308050082',
      },
    };

    this.discordInviteFormConfig = {
      url:
        'https://docs.google.com/forms/d/1wklzi9LiBOnq_ngZIcfDuoKHQgl9x9-J6C0v1He8qq4/formResponse',
      ids: {
        email: 'entry.1065686669',
      },
    };
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.discordInviteForm.nativeElement.submit();
      this.signupForm.nativeElement.submit();
      this.submitted = true;
    }
  }
}

class SignUpGoogleFormConfig {
  url: string;
  ids: {
    name: string;
    student_id: string;
    gender: string;
    program: string;
    email: string;
    number_of_years_member: string;
    interests: string;
  };
}

class DiscordSignUpGoogleFormConfig {
  url: string;
  ids: {
    email: string;
  };
}
