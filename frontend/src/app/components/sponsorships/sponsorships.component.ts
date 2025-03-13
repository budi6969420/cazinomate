import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {SponsorService} from "../../services/sponsor.service";
import {Sponsor} from "../../models/sponsor";

@Component({
  selector: 'app-sponsorships',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './sponsorships.component.html',
  styleUrl: './sponsorships.component.scss'
})
export class SponsorshipsComponent{
  sponsors!: Sponsor[]

  constructor(private service: SponsorService) {
    this.service.getSponsors().subscribe(
        (sponsors) => {this.sponsors = sponsors}
    )
  }
}
