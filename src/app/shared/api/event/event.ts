import { CscFile } from '../storage/cscFile';
export class Event {
    $key: string;
    title: string;
    presenter: string;
    description: string;
    date: string;
    time: string;
    location: string;
    resources: CscFile[];
    image: CscFile;
    timestamp: number;
    signupUrl: string;
}
