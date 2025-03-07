import { Component, AfterViewInit } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { ButtonDirective } from '../../shared/button/button.directive';

@Component({
  selector: 'csc-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss'],
  standalone: true,
  imports: [ButtonDirective, MarkdownComponent],
})
export class GuideComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Add IDs after view init in case content was loaded before the load event
    this.addHeaderIds();
  }

  addHeaderIds() {
    const content = document.querySelector('.markdown-content');
    if (!content) return;

    // Find all h1 and h2 elements
    const headers = content.querySelectorAll('h1, h2');

    headers.forEach((header) => {
      // Get the text content and create an ID
      const text = header.textContent || '';
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric chars with hyphens
        .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens

      // Set the ID
      header.id = id;
    });
  }
}
