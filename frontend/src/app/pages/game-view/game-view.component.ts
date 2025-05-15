import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router'
import {SponsorshipsComponent} from "../../components/adBar/sponsorships.component";
import {GameMetadataService} from "../../services/game-metadata.service";
import {GameMetadata} from "../../models/gameMetadata";
import {GameWrapperComponent} from "../../components/game-wrapper/game-wrapper.component";

@Component({
  selector: 'app-game-view',
  imports: [
    SponsorshipsComponent,
    GameWrapperComponent
  ],
  templateUrl: './game-view.component.html',
  styleUrl: './game-view.component.scss'
})
export class GameViewComponent implements OnInit {
  protected gameId!: string;
  protected gameMetadata!: GameMetadata;

  constructor(private router: Router, private route: ActivatedRoute, private gameMetadataService: GameMetadataService) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false
    this.gameId = <string> this.route.snapshot.paramMap.get('gameId')

    this.gameMetadataService.dataLoaded$.subscribe(
        (loadedMetadatas) => {
          this.gameMetadata = <GameMetadata> loadedMetadatas.find(i => i.id === this.gameId);
        }
    );
  }
}
