import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'csc-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
    public form: FormGroup;

    public signupFormConfig: SignUpGoogleFormConfig;
    public slackInviteFormConfig: SlackSignUpGoogleFormConfig;
    public submitted: boolean;

    @ViewChild('signupForm') signupForm;
    @ViewChild('slackInviteForm') slackInviteForm;

    constructor(private _formBuilder: FormBuilder) {
        this.submitted = false;

        this.form = this._formBuilder.group({
            name: ['', [Validators.required]],
            student_id: ['', [Validators.required]],
            gender: ['N/A', [Validators.required]],
            email: ['', [Validators.email]],
            program: ['', [Validators.required]],
            number_of_years_member: [0, [Validators.min(0), Validators.max(10)]],
            interests: ''
        });

        this.signupFormConfig = {
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSdn26ysJa7_rfrsNAoJr8w-euRbhssPnlHceC4qTM_ux4RekA/formResponse',
            ids: {
                name: 'entry.1746166300',
                student_id: 'entry.1408207548',
                gender: 'entry.1930392869',
                email: 'entry.232532916',
                program: 'entry.252923868',
                number_of_years_member: 'entry.1045425434',
                interests: 'entry.1308050082'
            }
        };

        this.slackInviteFormConfig = {
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSc5iWOEC9AraA2lhhzk6Ma5FsjeJ8Qcc32fViixRholGQ04fg/formResponse',
            ids: {
                email: 'entry.2140667031'
            }
        };
    }

    onSubmit(form: FormGroup) {
        if (form.valid) {
            this.slackInviteForm.nativeElement.submit();
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

class SlackSignUpGoogleFormConfig {
    url: string;
    ids: {
        email: string;
    };
}
