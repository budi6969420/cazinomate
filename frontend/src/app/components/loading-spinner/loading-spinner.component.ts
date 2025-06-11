import {Component, Input, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  imports: [],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent implements OnInit, OnDestroy {
  @Input() message: string | null = null;
  loadingDots = '.';
  baseLoadingText = 'Wird geladen';
  private intervalId?: number;

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  ngOnInit(): void {
    this.startLoadingDotsAnimation();
  }

  startLoadingDotsAnimation() {
    let dotCount = 1;
    this.intervalId = window.setInterval(() => {
      dotCount = (dotCount % 3) + 1;
      this.loadingDots = '.'.repeat(dotCount);
    }, 200);
  }

  get displayMessage(): string {
    return `${this.message ?? this.baseLoadingText}${this.loadingDots}`;
  }
}
