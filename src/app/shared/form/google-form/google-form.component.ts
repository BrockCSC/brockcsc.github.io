import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'csc-google-form',
  standalone: true,
  template: `
    <div class="row">
      <iframe
        class="col-12"
        [src]="formUrl()"
        frameborder="0"
        marginheight="0"
        height="500"
        marginwidth="0"
        >Loading…
      </iframe>
    </div>
  `,
})
export class GoogleFormComponent implements OnInit {
  @Input() googleFormUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    // Making sure (to some extent) that the link is compatible for being embedded, should be of the form
    // https://docs.google.com/forms/d/e/1FAIpQLScflDtwB7RGfqF9JkieRQZlI5OUzh6JdSpIsDM1zfNQZPpfIA/viewform?embedded=true
    const linkArray = this.googleFormUrl.split('/');
    if (linkArray.length >= 7) {
      linkArray.splice(7, linkArray.length - 7);
    }
    linkArray.push('viewform?embedded=true');
    this.googleFormUrl = linkArray.join('/');
  }

  formUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.googleFormUrl);
  }
}
