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
  sponsors: Sponsor[] = [];
  sponsorPlaceholders: Sponsor[] = [
    { "id": 1, "name": "PLACEHOLDER", "imageUrl": "https://placehold.co/600x300", "url": "https://placehold.co/600x300" },
    { "id": 2, "name": "PLACEHOLDER", "imageUrl": "https://placehold.co/600x300", "url": "https://placehold.co/600x300" },
    { "id": 3, "name": "PLACEHOLDER", "imageUrl": "https://placehold.co/600x300", "url": "https://placehold.co/600x300" },
    { "id": 4, "name": "PLACEHOLDER", "imageUrl": "https://placehold.co/600x300", "url": "https://placehold.co/600x300" },
    { "id": 5, "name": "PLACEHOLDER", "imageUrl": "https://placehold.co/600x300", "url": "https://placehold.co/600x300" }
  ];

  constructor(private service: SponsorService) {
    this.service.getSponsors().subscribe({
      next: (sponsors) => {
        if (sponsors && sponsors.length > 0) {
          this.sponsors = sponsors;
        } else {
          this.sponsors = this.sponsorPlaceholders;
        }
      },
      error: () => {
        this.sponsors = this.sponsorPlaceholders;
      }
    });
  }

}
