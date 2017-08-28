import { Injectable } from "@angular/core";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Query } from "angularfire2/interfaces";
import { Exec } from "./exec";
import { StorageService } from "../storage/storage.service";

@Injectable()
export class ExecApiService {
    execs: FirebaseListObservable<Exec[]>;
    _path: string;

    constructor(
        private _db: AngularFireDatabase,
        private _storageService: StorageService
    ) {
        this._path = "/exec";
        this.execs = _db.list(this._path);
    }

    public addExec(exec: Exec): firebase.Thenable<Exec> {
        return this.execs.push(exec);
    }

    public getCurrentExecs(): FirebaseListObservable<Exec[]> {
        return this.queryExec({
            orderByChild: "isCurrentExec",
            equalTo: true
        });
    }

    public getPreviousExecs(): FirebaseListObservable<Exec[]> {
        return this.queryExec({
            orderByChild: "isCurrentExec",
            equalTo: false
        });
    }

    public updateExec(key: string, value: Exec): firebase.Promise<void> {
        return this.execs.update(key, value);
    }

    public removeExecs(execs: Exec[]): Promise<void[]> {
        return Promise.all(execs.map(exec => this.removeExec(exec)));
    }

    public removeExec(exec: Exec): firebase.Promise<void> {
        const image = exec.image;

        if (image !== undefined) {
            this._storageService.removeFile(image.path, image.name);
        }

        return this.removeExecByKey(exec.$key);
    }

    public removeExecByKey(key: string): firebase.Promise<void> {
        return this.execs.remove(key);
    }

    private queryExec(query: Query): FirebaseListObservable<Exec[]> {
        return this._db.list(this._path, {
            query: query
        });
    }
}
