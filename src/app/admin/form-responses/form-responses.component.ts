import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormApiService } from '../../shared/api/form/form-api.service';
import { MatIcon } from '@angular/material/icon';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'csc-form-responses',
  templateUrl: './form-responses.component.html',
  styleUrls: ['./form-responses.component.css'],
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatIconButton,
    MatTooltip,
    CdkCopyToClipboard,
    MatIcon,
  ],
})
export class FormResponsesComponent implements OnInit {
  @Input() formId: string;
  entries$: Observable<any[]>;
  entries: any[];
  cols = 0;
  keys: string[];
  descriptions = {};

  constructor(
    private _route: ActivatedRoute,
    private _formApiService: FormApiService
  ) {}

  ngOnInit(): void {
    this.entries$ = this._formApiService.getAllEntries(this.formId);
    this.entries$.subscribe((_entries) => {
      this.entries = _entries;
      this.setMaxCol();
    });
    this._formApiService.getForm(this.formId).subscribe({
      next: (value) => {
        value.fields.forEach((field) => {
          this.descriptions[field.name] = field.description;
        });
      },
    });
  }

  setMaxCol() {
    const tempKeySet = {};
    this.entries.forEach((value) => {
      const valKeys = Object.keys(value);
      this.cols = Math.max(valKeys.length, this.cols);
      valKeys.forEach((key) => {
        tempKeySet[key] = true;
      });
    });
    this.keys = Object.keys(tempKeySet);
  }

  // Not exactly csv, should work with ideal-ish data. Use some lib if this becomes an issue.
  getColCsv(key: string) {
    const result = [];
    this.entries.forEach((entry) => {
      if (entry[key]) {
        result.push(entry[key]);
      }
    });
    return result.join(',');
  }
}
