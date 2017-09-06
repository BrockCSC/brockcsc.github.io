import { Query } from 'angularfire2/interfaces';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit } from '@angular/core';
import { Food, FoodApiService } from 'app/shared/api';

@Component({
    selector: 'csc-services',
    templateUrl: './services.component.html',
    styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
    private sections = [
        'Food',
        'Drink',
        'Other',
        'Combo'
    ];

    private sectionData: FoodSectionData[];

    constructor(private _foodApiService: FoodApiService) {}

    ngOnInit() {
        this.sectionData = this.sections.map(title => {
            return {
                data: this._foodApiService.queryFoodItems({
                    orderByChild: 'section',
                    equalTo: title
                }),
                title
            };
        });
    }

}

interface FoodSectionData {
    title: String;
    data: FirebaseListObservable<Food[]>;
}
