import { Observable } from 'rxjs';
import { AngularFireList } from '@angular/fire/database';
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

    public sectionData: FoodSectionData[];

    constructor(private _foodApiService: FoodApiService) { }

    ngOnInit() {
        this.sectionData = this.sections.map(title => {
            return {
                data: this._foodApiService.queryFoodItems(ref => {
                    return ref.orderByChild('section')
                        .equalTo(title);
                }),
                title
            };
        });
    }

}

interface FoodSectionData {
    title: String;
    data: Observable<Food[]>;
}
