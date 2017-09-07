import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'csc-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
    public googleForm: GoogleFormConfig;
    public submitted: boolean;
    @ViewChild('contactForm') contactForm;

    constructor() {
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
        this.submitted = true;
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
