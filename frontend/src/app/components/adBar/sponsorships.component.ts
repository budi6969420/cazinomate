import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {SponsorService} from "../../services/sponsor.service";
import {Sponsor} from "../../models/sponsor";

@Component({
  selector: 'app-adBar',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './adBar.component.html',
  styleUrl: './adBar.component.scss'
})
export class SponsorshipsComponent{
  constructor(protected service: SponsorService) {}
}
