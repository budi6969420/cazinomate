import { Component } from '@angular/core';
import {LoadingSpinnerComponent} from "../loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-loading-overlay',
  imports: [
    LoadingSpinnerComponent
  ],
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.scss'
})
export class LoadingOverlayComponent {

}
