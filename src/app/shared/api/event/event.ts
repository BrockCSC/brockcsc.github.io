import { CscFile } from '../file/cscFile';
export class Event {
    title: string;
    presenter: string;
    description: string;
    date: Date;
    time: string;
    location: string;
    resources: string[];


    // title: new FormControl('title'),
    //         presenter: new FormControl('presenter'),
    //         description: new FormControl('description'),
    //         date: new FormControl('date'),
    //         time: new FormControl('time'),
    //         location: new FormControl('location'),
    //         resources: new FormControl([])
    constructor(title: string, presenter: string, description: string, location: string, date = new Date()) {
        this.title = title;
        this.presenter = presenter;
        this.description = description;
        this.location = location;
        this.date = date;
    }
}
