# CSC
This is the repository for the Brock University Computer Science Club web page. 

- Angular CLI: 9.0.1


### Prerequisites
- [Node][Node] >= v12.7.0
- [npm][Npm] >= 6.11.3

[Node]: https://nodejs.org/en/download/
[Npm]: https://www.npmjs.com/get-npm


### Installation
- First run `npm install` from the terminal. This will install all the required packages into the `node_modules` folder in the root directory.

### Development
- To run a development server, run `npm run start`.
- This will spawn a server which can be accessed from `http://localhost:8080`.
- If wanting to lazy load images from the `assets` folder, run `npm run gen:img`. This will generate a file which can be located at `src/tmp/assets.json`. The file contains the configs for the images which then can be used within the app.

### Building for production
- In order to build the site, run `npm run build`. This generates a `dist` folder in the root directory which will contain the minimized version of the site.
- This will also run a postbuild script that will generate a serviceworker which will provide the PWA capabilities for the site.

### Deployment
- After the application has been built, we can finally run `npm run deploy` which will deploy the application to the `master` branch of this repository.

---

# Components
## Drag and Drop File Upload
Make sure that your module is importing the `SharedModule`.
```html
<csc-upload></csc-upload>
```
| Parameter | Value(s)      | Description                                                           |
|-----------|---------------|-----------------------------------------------------------------------|
| message   | `string`      | The message that will be displayed on top of the upload container.    |
| type      | single, multi | How many files should the component upload.                           |
| data      | `CscFile[]`   | When editing, you may want to pass existing file data to the dropper. |                    |

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

## Tooltip
Make sure that your module is importing the `SharedModule`.

| Parameter     	| Value(s)  	| Description                                                                        	|
|---------------	|-----------	|------------------------------------------------------------------------------------	|
| **forId (required)**         	| `string`  	| ID used to identify the host element for the tooltip.                                      	|
| direction 	| 'top', 'right', 'left', 'bottom' (default: bottom) 	| Sets the position of where the tooltip will be placed relative to the host element. 	    |

```html
<!-- Host -->
<div id="someId">
</div>

<!-- Tooltip, forId and host id must match -->
<csc-tooltip forId="someId" direction="right">
    <p>Some HTML content</p>
</csc-tooltip>
```


## Button
To use the csc button, a `csc-button` attribute needs to be added to either an `a` or `button` tag.

```html
<button csc-button>Text</button>

<a csc-button>Text</a>
```

## Progress Bar
Simple progress bar with a binding for current progress value.

| Parameter 	| Value(s)                         	| Description                     	|
|-----------	|----------------------------------	|---------------------------------	|
| color     	| 'navy', 'maroon' (default: navy) 	| The colour of the progress bar. 	|
| progress  	| 0-100                            	| Progress of the bar.            	|

```html
<csc-progress-bar progress="25" color="navy"></csc-progress-bar>
```

## Spinner (Loader)
Simple loader component that has no functionality. Use with `*ngIf` to manage whether it is displayed or not.

```html
<csc-spinner></csc-spinner>
```

## Slideshow & Slides
Slideshow component, to be used with child `Slide` components. Intended to be used with `csc-image`.

The `csc-slideshow` must contain slides.

| Parameter 	| Value(s)                         	| Description                     	                |
|---------------|----------------------------------	|---------------------------------------------------|
| delay     	| A number (default: 3) 	        | The delay **in seconds** before the next slide. 	|

```html
<csc-slideshow delay="2">
    <csc-slide>
            <!-- content -->
            <csc-img ...></csc-img>
    </csc-slide>
    <csc-slide>
            <!-- content -->
            <csc-img ...></csc-img>
    </csc-slide>
</csc-slideshow>
```
