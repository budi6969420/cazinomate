import {Component, Input, OnInit} from '@angular/core';
import {GameMetadata} from "../../models/gameMetadata";
import {ProgressBarComponent} from "../progress-bar/progress-bar.component";
import {GameComponent} from "../../games/game.component";

@Component({
  selector: 'app-game-wrapper',
  imports: [
    ProgressBarComponent,
    GameComponent
  ],
  templateUrl: './game-wrapper.component.html',
  styleUrl: './game-wrapper.component.scss'
})
export class GameWrapperComponent {
  @Input() gameMetadata!: GameMetadata;

  progress: number = 0;
  isLoading: boolean = true;

  handleProgressUpdate(percentage: number){
    setTimeout(() => {
      this.progress = percentage;
      setTimeout(() => {
        if(percentage >= 100)  this.isLoading = false;
      }, 1000);
    }, 500);
  }

}
