import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {ShopPackage} from "../../models/shopPackage";
import {DecimalPipe, NgClass, NgForOf} from "@angular/common";
import { user } from '../../models/user';

@Component({
  selector: 'app-shopPackage',
  standalone: true,
  imports: [
    DecimalPipe,
    NgClass
  ],
  templateUrl: './shopPackage.component.html',
  styleUrl: './shopPackage.component.scss'
})
export class ShopPackageComponent implements OnInit {
  @Input() package!: ShopPackage;
  @Input() isAuthenticated: boolean = false;
  @Output() packageClicked = new EventEmitter<ShopPackage>();

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
      if (!this.isAuthenticated) {
        return 'card-recommended';
      }

      return 'card-recommended active';
    }

    if (!this.isAuthenticated) {
      return 'card';
    }

    return 'card active';
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }
}
