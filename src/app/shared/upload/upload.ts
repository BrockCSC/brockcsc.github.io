export class Upload {
    $key: string;
    file: File;
    name: string;
    url: string;
    progress: number;
    creationDate: string;
    path: string;

    constructor(file: File) {
        this.file = file;
        this.name = file.name;
        this.creationDate = new Date().toJSON();
        this.progress = 0;
        this.path = this.createPath();
    }

    public createPath(): string {
        const date: Date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${year}/${month}/${day}`;
    }
}
