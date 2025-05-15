import {Component, Input, OnInit} from '@angular/core';
import {GameMetadata} from "../../models/gameMetadata";
import {ProgressBarComponent} from "../../atoms/progress-bar/progress-bar.component";
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
export class GameWrapperComponent implements OnInit {
  @Input() gameMetadata!: GameMetadata;

  progress: number = 10;
  isLoading: boolean = true;

  ngOnInit(): void {

  }
  handleProgressUpdate(percentage: number){
    setTimeout(() => {
      if(percentage > 10) this.progress = percentage;
      setTimeout(() => {
        if(percentage >= 100)  this.isLoading = false;
      }, 1000);
    }, 500);
  }

}
