import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {GameMetadata} from "../../models/gameMetadata";

@Component({
  selector: 'app-game-tile',
  imports: [],
  templateUrl: './game-tile.component.html',
  styleUrl: './game-tile.component.scss'
})
export class GameTileComponent {
  @Input() gameMetadata!: GameMetadata;
}
