import {Component, Input, numberAttribute} from '@angular/core';
import {GameMetadata} from "../../models/gameMetadata";

@Component({
  selector: 'app-progress-bar',
  imports: [],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {
  @Input() game!: GameMetadata
}
