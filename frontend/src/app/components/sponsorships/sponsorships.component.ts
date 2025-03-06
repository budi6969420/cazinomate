import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-sponsorships',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './sponsorships.component.html',
  styleUrl: './sponsorships.component.scss'
})
export class SponsorshipsComponent implements OnInit, OnDestroy {
  originalImages: string[] = [
    'https://placehold.co/600x300',
    'https://placehold.co/600x300',
    'https://placehold.co/600x300',
    'https://placehold.co/600x300',
    'https://placehold.co/600x300'
  ];
  images: string[] = [];
  translateX = 0;
  imageWidth = 300;
  scrollSpeed = 2;
  intervalId: any;

  ngOnInit() {
    this.cloneImages();
    this.startScrolling();
  }

  ngOnDestroy() {
    this.stopScrolling();
  }

  cloneImages() {
    this.images = [...this.originalImages, ...this.originalImages.slice(0, 1)]; // Clone the first image
  }

  startScrolling() {
    this.intervalId = setInterval(() => {
      this.translateX -= this.scrollSpeed;
      if (Math.abs(this.translateX) > this.imageWidth * this.originalImages.length) {
        this.translateX = 0;
      }
    }, 20);
  }

  stopScrolling() {
    clearInterval(this.intervalId);
  }
}
