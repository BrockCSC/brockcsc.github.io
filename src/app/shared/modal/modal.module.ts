import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalHeaderComponent } from './modal-header/modal-header.component';
import { ModalBodyComponent } from './modal-body/modal-body.component';
import { ModalFooterComponent } from './modal-footer/modal-footer.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    exports: [ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent],
    declarations: [ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent]
})
export class ModalModule { }
