import { Component } from '@angular/core';
import {SponsorshipsComponent} from "../../components/adBar/sponsorships.component";
import {GameOverviewComponent} from "../../components/game-overview/game-overview.component";
import {AnnouncementBarComponent} from "../../components/announcement-bar/announcement-bar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SponsorshipsComponent,
    GameOverviewComponent,
    AnnouncementBarComponent

  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
