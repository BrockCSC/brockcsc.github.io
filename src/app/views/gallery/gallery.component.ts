import { Component } from '@angular/core';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from 'ngx-gallery-9';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FilesApiService } from './../../shared/api/files/files-api.service';

@Component({
  selector: 'csc-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  galleryOptions: NgxGalleryOptions[] = [
    {
      width: '100%',
      height: '70vh',
      thumbnailsColumns: 4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview: false,
    },
    {
      breakpoint: 992,
      thumbnailsColumns: 3,
    },
    {
      breakpoint: 600,
      thumbnailsColumns: 2,
    },
  ];

  galleryImages$: Observable<NgxGalleryImage[]>;

  constructor(filesApi: FilesApiService) {
    this.galleryImages$ = filesApi.gallery$().pipe(
      map((files) => {
        return files.map((file) => ({
          medium: file.url,
          small: file.url,
          big: file.url,
        }));
      })
    );
  }
}
