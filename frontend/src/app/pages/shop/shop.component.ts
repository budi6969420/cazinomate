import { Component} from '@angular/core';
import {PackageComponent} from "../../components/package/package.component";
import {PackageService} from "../../services/package.service";
import {BuyConfirmationModalComponent} from "../../components/buy-confirmation-modal/buy-confirmation-modal.component";
import {NgClass} from "@angular/common";
import {Package} from "../../models/package";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    PackageComponent,
    BuyConfirmationModalComponent,
    NgClass,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent {
  protected selectedPackage: Package | null = null;
  constructor(protected packageService: PackageService) {
  }

  handlePackageClick($event: Package) {
    this.selectedPackage = $event;
  }

  handleModalClose() {
    this.selectedPackage = null;
  }
}
