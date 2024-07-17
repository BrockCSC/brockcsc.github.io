import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { GUID } from 'app/shared/guid';
import { NgIf } from '@angular/common';

@Component({
  selector: 'csc-checkbox',
  template: `
    <div class="csc-checkbox">
      <ng-content select="input[type='checkbox']"></ng-content>
      <label [for]="_id" *ngIf="label !== null">{{ label }}</label>
      <label
        [for]="_id"
        *ngIf="label === null"
        [innerHTML]="_defaultLabel"
      ></label>
    </div>
  `,
  styles: `
    .csc-checkbox {
      display: inline-block;
      vertical-align: middle;
    }
  `,
  standalone: true,
  imports: [NgIf],
})
export class CheckboxComponent implements AfterViewInit {
  @Input() label = null;
  @ViewChild('checkbox') inputParent: ElementRef;
  public _id: string = GUID.newGuid();
  public _defaultLabel = '&#8203;'; // no whitespace empty character
  public input: HTMLInputElement;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.input = this.elementRef.nativeElement.querySelector(
      '.csc-checkbox>input'
    );
    this.input.className += ' magic-checkbox';
    this.input.id = this._id;
  }
}
