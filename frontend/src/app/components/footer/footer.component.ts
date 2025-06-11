import {Component} from '@angular/core';
import {SponsorService} from "../../services/sponsor.service";
import {GameMetadataService} from "../../services/game-metadata.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  constructor(protected sponsorService: SponsorService, protected gameMetaDataService: GameMetadataService) {
  }
}
