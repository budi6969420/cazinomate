import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-confirmation',
  imports: [],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss'
})
export class OrderConfirmationComponent implements OnInit, OnDestroy {

  constructor(private router: Router) {
  }

  public secondsUntilRedirect: number = 5;
  private countdownInterval: any;

  ngOnInit(): void {
    this.countdownInterval = setInterval(this.updateCountdown.bind(this), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.countdownInterval);
  }

  updateCountdown() {
    if (--this.secondsUntilRedirect <= 0) {
      clearInterval(this.countdownInterval);
      this.router.navigateByUrl('/shop');
    }
  }
}
