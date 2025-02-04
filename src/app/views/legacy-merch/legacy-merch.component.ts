import { Component, OnInit } from '@angular/core';
import { ButtonDirective } from '../../shared/button/button.directive';
import { NgIf } from '@angular/common';
import { InputContainerComponent } from '../../shared/input-container/input-container.component';

@Component({
  selector: 'csc-legacy-merch',
  templateUrl: './legacy-merch.component.html',
  styleUrls: ['./legacy-merch.component.scss'],
  standalone: true,
  imports: [InputContainerComponent, NgIf, ButtonDirective],
})
export class LegacyMerchComponent implements OnInit {
  public color: String = 'black';
  public gender: String = 'm';

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
      image.src = 'app/../assets/merch/2024/white' + '-' + this.gender + '.png';
    } else {
      this.color = 'black';
      image.src = 'app/../assets/merch/2024/black' + '-' + this.gender + '.png';
    }
  }

  // Change gender
  changeGender(): void {
    setTimeout(() => {
      const image = <HTMLImageElement>document.getElementById('image');

      if (this.gender == 'm') {
        this.gender = 'f';
      } else {
        this.gender = 'm';
      }

      image.src =
        'app/../assets/merch/2024/' + this.color + '-' + this.gender + '.png';
      this.changeGender();
    }, 10000);
  }

  ngOnInit(): void {
    this.changeGender();

    // Ensure video plays on page load
    const video = <HTMLVideoElement>document.getElementById('video');

    video.muted = true;
    video.play();
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
    window.location.href = 'https://buy.stripe.com/cN2fZd4xx3V66OceUZ';
  }
}
