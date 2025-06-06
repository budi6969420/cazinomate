import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  imports: [],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  loadingDots = '.';
  baseLoadingText = 'Wird geladen';
  constructor() {
    this.startLoadingDotsAnimation();
  }

  startLoadingDotsAnimation() {
    let dotCount = 1;
    setInterval(() => {
      dotCount = (dotCount % 3) + 1;
      this.loadingDots = '.'.repeat(dotCount);
    }, 200);
  }
}
