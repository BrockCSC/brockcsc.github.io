import {
  Component,
  ElementRef,
  enableProdMode,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ButtonDirective } from '../../shared/button/button.directive';
import { NgIf } from '@angular/common';
import { InputContainerComponent } from '../../shared/input-container/input-container.component';
import { environment } from 'environments/environment';

if (environment.production) {
  enableProdMode();
}

@Component({
  providers: [],
  selector: 'csc-merch',
  templateUrl: './merch.component.html',
  styleUrls: ['./merch.component.scss'],
  standalone: true,
  imports: [InputContainerComponent, NgIf, ButtonDirective],
})
export class MerchComponent implements OnInit {
  public color: String = 'black';
  public gender: String = 'm';
  private autoChangeEnabled: boolean = true;

  constructor() {}

  // Handles scrolling on buy button
  buynow(grid: HTMLElement): void {
    grid.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  // Deals with hoodie color previews
  changeColor(newColor): void {
    const image = <HTMLImageElement>document.getElementById('image');

    if (newColor == 'White') {
      this.color = 'white';
      image.src = 'app/../assets/merch/2025/white' + '-' + this.gender + '.png';
    } else {
      this.color = 'black';
      image.src = 'app/../assets/merch/2025/black' + '-' + this.gender + '.png';
    }

    this.updateActiveThumbnail();
  }

  selectImage(imageKey: string): void {
    this.autoChangeEnabled = false;

    const [color, gender] = imageKey.split('-');
    this.color = color;
    this.gender = gender;

    const image = <HTMLImageElement>document.getElementById('image');
    image.src = `app/../assets/merch/2025/${imageKey}.png`;

    this.updateActiveThumbnail();

    const colorSelect = document.querySelector('select') as HTMLSelectElement;
    if (colorSelect) {
      colorSelect.value = color === 'black' ? 'Black' : 'White';
    }
  }

  private updateActiveThumbnail(): void {
    document.querySelectorAll('.thumbnail').forEach((thumb) => {
      thumb.classList.remove('active');
    });

    const currentKey = `${this.color}-${this.gender}`;

    const thumbByData = document.querySelector(
      `.thumbnail[data-image-key="${currentKey}"]`
    );
    if (thumbByData) {
      thumbByData.classList.add('active');
      return;
    }

    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb) => {
      const clickHandler =
        thumb.getAttribute('ng-reflect-click') ||
        thumb.getAttribute('onclick') ||
        '';

      if (clickHandler.includes(currentKey)) {
        thumb.classList.add('active');
      } else {
        const thumbImg = thumb.querySelector('img');
        if (thumbImg && thumbImg.getAttribute('src').includes(currentKey)) {
          thumb.classList.add('active');
        }
      }
    });
  }

  // Change gender
  changeGender(): void {
    if (!this.autoChangeEnabled) return;

    setTimeout(() => {
      const image = <HTMLImageElement>document.getElementById('image');

      if (this.gender == 'm') {
        this.gender = 'f';
      } else {
        this.gender = 'm';
      }

      image.src =
        'app/../assets/merch/2025/' + this.color + '-' + this.gender + '.png';

      this.updateActiveThumbnail();
      this.changeGender();
    }, 10000);
  }

  ngOnInit(): void {
    this.changeGender();

    // Ensure video plays on page load
    const video = <HTMLVideoElement>document.getElementById('video');

    video.muted = true;
    video.play();

    setTimeout(() => this.updateActiveThumbnail(), 100);
  }

  toggleMute() {
    const video = <HTMLVideoElement>document.getElementById('video');

    if (video.muted) {
      video.muted = false;
    } else {
      video.muted = true;
    }
  }

  // Handles Stripe button click
  onStripeClick(): void {
    window.location.href = environment.stripe2025;
  }
}
