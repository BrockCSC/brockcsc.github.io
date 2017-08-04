import { CscFile } from '../storage/cscFile';
export class Event {
    title: string;
    presenter: string;
    description: string;
    date: Date;
    time: string;
    location: string;
    resources: string[];

    constructor(title: string, presenter: string, description: string, location: string, date = new Date()) {
        this.title = title;
        this.presenter = presenter;
        this.description = description;
        this.location = location;
        this.date = date;
    }
}
