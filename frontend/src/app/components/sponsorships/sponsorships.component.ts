import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-sponsorships',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './sponsorships.component.html',
  styleUrl: './sponsorships.component.scss'
})
export class SponsorshipsComponent {
}
