import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router
  ) {}

  init() {
    // Listen for route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateMetaTags(event.url);
      });
  }

  private updateMetaTags(url: string) {
    let title = 'Brock Computer Science Club';
    let description =
      'The official website of the Brock University Computer Science Club. Join us for events, workshops, and community!';
    let imageUrl = 'https://brockcsc.ca/assets/thumbnail.png';

    if (url.includes('/merch')) {
      title = 'Brock CSC Merchandise';
      description =
        'Get your official Brock Computer Science Club merchandise. Show your CSC pride with our branded apparel and accessories!';
    } else if (url.includes('/team')) {
      title = 'Brock CSC Team';
      description =
        'Meet the team behind the Brock Computer Science Club. Our dedicated executives work to create a vibrant community for CS students.';
    } else if (url.includes('/events')) {
      title = 'Brock CSC Events';
      description =
        'Discover upcoming events hosted by the Brock Computer Science Club. Join us for workshops, hackathons, social gatherings, and more!';
    } else if (url.includes('/contact')) {
      title = 'Contact Brock CSC';
      description =
        "Get in touch with the Brock Computer Science Club. We're here to answer your questions and help you get involved!";
    } else if (url.includes('/signup')) {
      title = 'Join Brock CSC';
      description =
        'Become a member of the Brock Computer Science Club. Join our community of passionate CS students and professionals!';
    } else if (url.includes('/links')) {
      title = 'Brock CSC Links';
      description =
        'All important links for the Brock Computer Science Club in one place. Find our social media, Discord, events, and resources here!';
    } else if (url.includes('/guide')) {
      title = 'Brock CSC Student Guide';
      description =
        'Comprehensive guide for Computer Science students at Brock University. Tips, resources, and advice to help you succeed in your CS journey!';
    } else if (url.includes('/services')) {
      title = 'Brock CSC Services';
      description =
        "Services offered by the Brock Computer Science Club. From tutoring to technical workshops, we're here to support your academic success!";
    }

    this.title.setTitle(title);

    this.meta.updateTag({ name: 'description', content: description });

    this.meta.updateTag({
      property: 'og:url',
      content: `https://brockcsc.ca${url}`,
    });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });

    this.meta.updateTag({
      name: 'twitter:url',
      content: `https://brockcsc.ca${url}`,
    });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
  }
}
