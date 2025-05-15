import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-age-check-modal',
  imports: [
    NgIf
  ],
  templateUrl: './age-check-modal.component.html',
  styleUrl: './age-check-modal.component.scss'
})
export class AgeCheckModalComponent implements OnInit {
  showModal = false;

  ngOnInit(): void {
    const isOver18 = this.getCookie('isOver18');
    this.showModal = isOver18 !== 'true';
  }

  confirmAge(isOver18: boolean): void {
    if (isOver18) {
      this.setCookie('isOver18', 'true', 365);
      this.showModal = false;
    } else {
      window.location.href = 'https://www.youtube.com/watch?v=uyT_7GrBUew&ab_channel=TOGILIVE';
    }
  }

  private setCookie(name: string, value: string, days: number): void {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  }

  private getCookie(name: string): string | null {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='))
      ?.split('=')[1] || null;
  }
}
