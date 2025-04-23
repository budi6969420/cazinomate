import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import {SponsorshipsComponent} from "../../components/adBar/sponsorships.component";

@Component({
  selector: 'app-game-view',
  imports: [
    SponsorshipsComponent
  ],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.scss'
})
export class GameViewComponent implements OnInit {
  protected gameId!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.gameId = <string> this.route.snapshot.paramMap.get('gameId')
  }
}
