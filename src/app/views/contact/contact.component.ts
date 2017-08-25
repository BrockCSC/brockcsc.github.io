import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'csc-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    public googleForm: GoogleFormConfig;
    @ViewChild('contactForm') contactForm;

    constructor() {
        this.googleForm = {
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSd5odQ24nlsNQGLByLAzJwLgS7zFGb3GaEcAKRKqYGktpOrrQ/formResponse',
            // post parameters for the google form
            ids: {
                name: 'entry.1340504895',
                email: 'entry.1741416472',
                message: 'entry.1141734855'
            }
        };
    }

    ngOnInit() {

    }

    public onSubmit(): void {
        this.contactForm.nativeElement.submit();
        this.contactForm.nativeElement.reset();
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
