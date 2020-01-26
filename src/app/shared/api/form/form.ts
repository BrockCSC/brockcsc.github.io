export interface Field {
    type: FieldType;
    name: string;
    description: string;
    required: boolean;
}

export interface TextInput extends Field {
    type: FieldType.text;
}

export interface RadioInput extends Field {
    type: FieldType.radio;
    options: RadioOption[];
}

export interface RadioOption {
    name: string;
}

export interface CheckboxInput extends Field {
    type: FieldType.checkbox;
}

export interface FormInfo {
    fields: Field[];
}

export enum FieldType {
    text = 'Text',
    radio = 'Radio',
    checkbox = 'Checkbox',
}

export const randomUid = (length: number) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

export const emptyForm = () => {
    return {fields: []};
};

export const emptyTextInput = () => {
    return {
        type: FieldType.text,
        name: randomUid(10),
        description: '',
        required: false,
    };
};


export const emptyRadioInput = () => {
    return {
        type: FieldType.radio,
        name: randomUid(10),
        description: '',
        required: false,
        options: []
    };
};


export const emptyCheckboxInput = () => {
    return {
        type: FieldType.checkbox,
        name: randomUid(10),
        description: '',
        required: false,
    };
};
