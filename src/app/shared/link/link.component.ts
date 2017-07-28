import { Component, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "li[csc-link], a[csc-link]",
    templateUrl: "./link.component.html",
    styleUrls: ["./link.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class LinkComponent implements OnInit {

    constructor() {}

    ngOnInit() {}
}
