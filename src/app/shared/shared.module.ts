import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CscButtonDirective } from './csc-button/csc-button.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CscButtonDirective]
})
export class SharedModule { }
