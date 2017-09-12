import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'csc-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
    public form: FormGroup;
    public googleForm: GoogleFormConfig;
    @ViewChild('signupForm') signupForm;

    constructor(private _formBuilder: FormBuilder) {
        this.form = this._formBuilder.group({
            name: ['', [Validators.required]],
            student_id: ['', [Validators.required]],
            gender: ['N/A', [Validators.required]],
            email: ['', [Validators.email]],
            program: ['', [Validators.required]],
            number_of_years_member: [0, [Validators.min(0), Validators.max(10)]],
            interests: ''
        });

        this.googleForm = {
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSetf2LuAor5VzbWRkm8T7wJ2MI7kvEzWKmwYCJt-sjniduyRQ/formResponse',
            ids: {
                name: 'entry.789935118',
                student_id: 'entry.1629117136',
                gender: 'entry.792012042',
                email: 'entry.1980144799',
                program: 'entry.767106880',
                number_of_years_member: 'entry.458027254',
                interests: 'entry.692315741'
            }
        };
    }

    onSubmit(form: FormGroup) {
        if (form.valid) {
            // TODO: Send invite to slack
            this.signupForm.nativeElement.submit();
            this.signupForm.nativeElement.reset();
        }
    }

}

class GoogleFormConfig {
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
