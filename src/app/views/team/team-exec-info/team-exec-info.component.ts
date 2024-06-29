import { Component, Input, OnInit } from '@angular/core';
import { Exec } from '../../../shared/api';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'csc-team-exec-info',
  templateUrl: './team-exec-info.component.html',
  styleUrls: ['./team-exec-info.component.scss'],
  standalone: true,
  imports: [NgIf, MatIcon],
})
export class TeamExecInfoComponent implements OnInit {
  isOpen: boolean;
  canOpen: boolean;

  constructor() {
    this.isOpen = false;
  }

  @Input() exec: Exec;

  ngOnInit(): void {
    this.canOpen = this.exec.description && this.exec.description !== '';
  }

  clicked() {
    this.isOpen = !this.isOpen;
  }
}
