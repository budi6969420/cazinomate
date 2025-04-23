import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import {Package} from "../../models/package";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-package',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss'
})
export class PackageComponent implements OnInit {
  @Input() package!: Package;
  @Output() packageClicked = new EventEmitter<Package>();

  ShowConfirmationModal() {
    this.packageClicked.emit(this.package);
  }

  tiles: any[] = [];

  ngOnInit() {
    const cols = 16;
    const rows = Math.ceil(window.innerHeight / (window.innerWidth / cols));
    this.tiles = new Array(cols * rows);
  }
}
