import { Provider, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export abstract class AbstractValueAccessor implements ControlValueAccessor {

    private _propagateChange: any = () => { };

    public writeValue(value) { }

    public registerOnChange(fn) { this._propagateChange = fn; }

    public registerOnTouched() { }

    public propagateChange(value): void {
        this._propagateChange(value);
    }
}
export function CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR(clazz: any) {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => clazz),
        multi: true
    };
}

