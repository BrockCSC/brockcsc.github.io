import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { environment } from 'environments/environment';
import { MerchFormConfig } from 'environments/types';

@Component({
  providers: [UntypedFormBuilder],
  selector: 'csc-merch',
  templateUrl: './merch.component.html',
  styleUrls: ['./merch.component.scss'],
})
export class MerchComponent implements OnInit {
  public form: UntypedFormGroup;
  public googleForm: MerchFormConfig;
  public submitted: boolean;
  @ViewChild('merchForm', { static: true })
  merchForm: ElementRef<HTMLFormElement>;

  constructor(private _formBuilder: UntypedFormBuilder) {
    this.form = this._formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      id: ['', [Validators.required]],
      color: ['', [Validators.required]],
      size: ['', [Validators.required]],
      refnum: ['', [Validators.required]],
    });

    this.submitted = false;
    this.googleForm = environment.merchForm;
  }

  // Handles scrolling on buy button
  buynow(grid: HTMLElement): void {
    grid.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  // Deals with hoodie color previews
  public color: String = 'black';
  public gender: String = 'm';

  changeColor(newColor): void {
    const image = <HTMLImageElement>document.getElementById('image');

    if (newColor == 'White') {
      this.color = 'white';
      image.src = 'app/../assets/merch/white' + '-' + this.gender + '.png';
    } else {
      this.color = 'black';
      image.src = 'app/../assets/merch/black' + '-' + this.gender + '.png';
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
        'app/../assets/merch/' + this.color + '-' + this.gender + '.png';
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

  // Handles form submission
  onSubmit(): void {
    if (this.form.valid) {
      this.submitted = true;
      this.merchForm.nativeElement.submit();
      this.merchForm.nativeElement.reset();
    }
  }
}
