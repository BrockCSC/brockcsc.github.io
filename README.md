# Csc
`http://localhost:8080`

# Components
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

## Drag and Drop Upload
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