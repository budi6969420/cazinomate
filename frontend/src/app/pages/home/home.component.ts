import { Component } from '@angular/core';
import {SponsorshipsComponent} from "../../components/adBar/sponsorships.component";
import {GameOverviewComponent} from "../../components/game-overview/game-overview.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SponsorshipsComponent,
    GameOverviewComponent

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
