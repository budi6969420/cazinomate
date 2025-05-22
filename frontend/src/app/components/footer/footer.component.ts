import {Component} from '@angular/core';
import {SponsorService} from "../../services/sponsor.service";
import {GameMetadataService} from "../../services/game-metadata.service";
import {PaymentProviderService} from "../../services/payment-provider.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [

  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  constructor(protected sponsorService: SponsorService, protected gameMetaDataService: GameMetadataService, protected paymentProviderService : PaymentProviderService) {
  }
}
