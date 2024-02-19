import { Component, ElementRef, ViewChild } from '@angular/core';
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
export class MerchComponent {
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

  buynow(grid: HTMLElement) {
    grid.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  changeColor(newColor) {
    const image = <HTMLImageElement>document.getElementById('image');

    if (newColor == 'White') {
      image.src = 'app/../assets/merch/white.png';
    } else {
      image.src = 'app/../assets/merch/black.png';
    }

    document
      .getElementById('grid')
      .scrollIntoView({ block: 'center', behavior: 'smooth' });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted = true;
      this.merchForm.nativeElement.submit();
      this.merchForm.nativeElement.reset();
    }
  }
}
