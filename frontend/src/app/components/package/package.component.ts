import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Package} from "../../models/package";
import {DecimalPipe, NgClass, NgForOf} from "@angular/common";
import { User } from '../../models/user';

@Component({
  selector: 'app-package',
  standalone: true,
  imports: [
    NgForOf,
    DecimalPipe,
    NgClass
  ],
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss'
})
export class PackageComponent implements OnInit {
  @Input() package!: Package;
  @Input() user: User | null = null;
  @Output() packageClicked = new EventEmitter<Package>();

  ShowConfirmationModal() {
    this.packageClicked.emit(this.package);
  }

  tiles: any[] = [];

  ngOnInit() {
    const cols = 8;
    const rows = 14;
    this.tiles = new Array(cols * rows);
  }

  getCardClass() : string {
    if (this.package.recommended)
    {
      if (this.user == null) {
        return 'card-recommended';
      }

      return 'card-recommended active';
    }

    if (this.user == null) {
      return 'card';
    }

    return 'card active';
  }
}
