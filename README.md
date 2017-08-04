# Csc
`http://localhost:8080`

# Components
## Drag and Drop File Upload
Make sure that your module is importing the `SharedModule`.
```html
<csc-upload></csc-upload>
```
| Parameter | Value(s)      | Description                                                        |
|-----------|---------------|--------------------------------------------------------------------|
| message   | `string`      | The message that will be displayed on top of the upload container. |
| type      | single, multi | How many files should the component upload..                       |

## Modal
Make sure that your module is importing the `SharedModule`.
```html
<csc-modal>
    <csc-modal-header>
        <!-- Modal Header -->
    </csc-modal-header>
    <csc-modal-body>
         <!-- Modal Body -->
    </csc-modal-body>
    <csc-modal-footer>
         <!-- Modal Footer -->
    </csc-modal-footer>
</csc-modal>
```

There are two ways to programatically open and close the modal.

1. Access the modal component using local variables from the parent component
```html
<button (click)="modalAccessor.open()">Open Modal</button>
<csc-modal #modalAccessor>
...
```
2. Trigger using the ViewChild reference from the parent component.
```html
<button (click)="openModal()">Open Modal</button>
<csc-modal #modalAccessor>
...
```
```typescript
import { ViewChild } from '@angular/core';
@ViewChild('modalAccessor') modal: ModalComponent;
public openModal(): void {
    this.modal.open();
}
```

## Input Container
Make sure that your module is importing the `SharedModule`.

| Parameter     	| Value(s)  	| Description                                                                        	|
|---------------	|-----------	|------------------------------------------------------------------------------------	|
| label         	| `string`  	| This parameter will add a label to the input.                                      	|
| labelLocation 	| left, top 	| Sets the position of where the label will be placed relative to the input field. 	    |

```html
<csc-input-container label="label" labelLocation="left">
    <input type="text">
</csc-input-container>
```

## Checkbox
Make sure that your module is importing the `SharedModule`.
```html
<csc-checkbox>
    <input type="checkbox">
</csc-checkbox>
```
| Parameter     	| Value(s)  	| Description                                       |
|---------------	|-----------	|------------------------------------------------	|
| label         	| `string`  	| This parameter will add a label to the input.     |