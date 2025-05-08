import {Component, Input, OnInit} from '@angular/core';
import {GameTileComponent} from "../../atoms/game-tile/game-tile.component";
import {GameMetadata} from "../../models/gameMetadata";
import {ProgressBarComponent} from "../../atoms/progress-bar/progress-bar.component";
import {GameMetadataService} from "../../services/game-metadata.service";
import {NgComponentOutlet} from "@angular/common";

@Component({
  selector: 'app-game-loader',
  imports: [
    GameTileComponent,
    ProgressBarComponent,
    NgComponentOutlet
  ],
  templateUrl: './game-loader.component.html',
  styleUrl: './game-loader.component.scss'
})
export class GameLoaderComponent implements OnInit {
  @Input() gameMetadata!: GameMetadata;

  constructor(protected gameMetadataService: GameMetadataService) {
  }

  progress: number = 10;
  isLoading: boolean = true;

  ngOnInit(): void {

  }


}
