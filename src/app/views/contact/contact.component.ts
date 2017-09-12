import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    providers: [FormBuilder],
    selector: 'csc-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    public form: FormGroup;
    public googleForm: GoogleFormConfig;
    public submitted: boolean;
    @ViewChild('contactForm') contactForm;

    constructor(private _formBuilder: FormBuilder) {
        this.form = this._formBuilder.group({
            email: ['', [Validators.email, Validators.required]],
        });

        this.submitted = false;
        this.googleForm = {
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSeuMwbqxUfOJ1haeYG4fuvPjHDv2Lr82vLP_SSiISqgRvL70w/formResponse',
            // post parameters for the google form
            ids: {
                name: 'entry.2137362012',
                email: 'entry.1926258208',
                message: 'entry.971826736'
            }
        };
    }

    ngOnInit() {

    }

    public onSubmit(): void {
        if (this.form.valid) {
            this.submitted = true;
            this.contactForm.nativeElement.submit();
            this.contactForm.nativeElement.reset();
        }
    }
}

class GoogleFormConfig {
    url: string;
    ids: {
        name: string;
        email: string;
        message: string;
    };
}
