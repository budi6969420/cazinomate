import {Component} from '@angular/core';
import {SponsorService} from "../../services/sponsor.service";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(sponsorService: SponsorService) {
  }
}
