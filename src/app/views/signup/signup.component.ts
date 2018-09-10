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
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSczdObV3U1qU30OT1z7wi7kN3jvInbWGbWk5HUKhOyBmCrRPQ/formResponse',
            ids: {
                name: 'entry.269010871',
                student_id: 'entry.455461727',
                gender: 'entry.1428431300',
                email: 'entry.1990495199',
                program: 'entry.680690199',
                number_of_years_member: 'entry.1966426904',
                interests: 'entry.207170582'
            }
        };

        this.slackInviteFormConfig = {
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSeqfI9wcilbJb-zb554SmQBZjWBwbTCVfzIo5OneNTC9BL4SA/formResponse',
            ids: {
                email: 'entry.347926706'
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
