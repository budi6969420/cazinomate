import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-confirmation',
  imports: [],
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.scss'
})
export class OrderConfirmationComponent implements OnInit {

  constructor(private router: Router) {
  }

  public timeUntilRedirecting: number = 5;

  ngOnInit(): void {
    setInterval(this.updateCountdown.bind(this), 1000);
  }

  updateCountdown() {
    this.timeUntilRedirecting--;

    if (this.timeUntilRedirecting == 0) {
      this.router.navigateByUrl('/shop');
    }
  }
}
