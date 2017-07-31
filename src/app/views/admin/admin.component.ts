import { Component, OnInit } from '@angular/core';
import { EventApiService } from 'app/shared/api';

@Component({
  selector: 'csc-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private _api: EventApiService) { }

  ngOnInit() {

}

}
