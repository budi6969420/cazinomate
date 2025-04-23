import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Package} from "../../models/package";
import {BuyConfirmationModalComponent} from "../buy-confirmation-modal/buy-confirmation-modal.component";
import {NgClass, NgIf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-package',
  standalone: true,
  imports: [
    NgIf,
    NgStyle,
    NgClass
  ],
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss'
})
export class PackageComponent {
  @Input() package!: Package;
  @Output() packageClicked = new EventEmitter<Package>();

  ShowConfirmationModal() {
    this.packageClicked.emit(this.package);
  }
}
