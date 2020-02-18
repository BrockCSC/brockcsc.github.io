import { CscFile } from '../storage/cscFile';
export class CscEvent {
    $key: string;
    title: string;
    presenter: string;
    description: string;
    location: string;
    resources: CscFile[];
    image: CscFile;
    signupUrl: string;
    datetime: {
        date: string;
        timeStart: string;
        timeEnd: string;
        timeStartTimestamp: number;
        timeEndTimestamp: number;
    };
    gallery: CscFile[];
    formId: string;
}
