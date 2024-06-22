import { Component, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { Food, FoodApiService } from 'app/shared/api';
import { Observable } from 'rxjs';
import { DISCORD_LINK } from './../../shared/utils/constants';
import { NgFor, AsyncPipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'csc-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  standalone: true,
  imports: [RouterLink, NgFor, AsyncPipe, CurrencyPipe],
})
export class ServicesComponent implements OnInit {
  discordLink = DISCORD_LINK;
  private sections = ['Food', 'Drink', 'Other', 'Combo'];

  public sectionData: FoodSectionData[];

  constructor(private _foodApiService: FoodApiService) {}

  ngOnInit() {
    this.sectionData = this.sections.map((title) => {
      return {
        data: this._foodApiService.queryFoodItems((ref) => {
          return ref.orderByChild('section').equalTo(title);
        }),
        title,
      };
    });
  }
}

interface FoodSectionData {
  title: string;
  data: Observable<Food[]>;
}
