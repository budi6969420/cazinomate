import {Component, OnInit} from '@angular/core';
import {PackageComponent} from "../../components/package/package.component";
import {PackageService} from "../../services/package.service";
import {BuyConfirmationModalComponent} from "../../components/buy-confirmation-modal/buy-confirmation-modal.component";
import {Package} from "../../models/package";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [
    PackageComponent,
    BuyConfirmationModalComponent,
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  protected selectedPackage: Package | null = null;
  public user: User | null = null;

  constructor(protected packageService: PackageService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe((userData) => {
      this.user = userData;
    });
    }

  handlePackageClick($event: Package) {
    this.selectedPackage = $event;
  }

  handleModalClose() {
    this.selectedPackage = null;
  }
}
