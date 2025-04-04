import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Sponsor} from "../models/sponsor";

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  private apiUrl = 'http://localhost:8080/api/sponsor';

  public sponsors: Sponsor[] = [];
  private sponsorPlaceholders: Sponsor[] = [
    {
      id: 1,
      name: "PLACEHOLDER",
      imageUrl: "https://placehold.co/600x300",
      url: "https://placehold.co/600x300",
      isVip: true
    },
    {
      id: 2,
      name: "PLACEHOLDER",
      imageUrl: "https://placehold.co/600x300",
      url: "https://placehold.co/600x300",
      isVip: true
    },
    {
      id: 3,
      name: "PLACEHOLDER",
      imageUrl: "https://placehold.co/600x300",
      url: "https://placehold.co/600x300",
      isVip: true
    },
    {
      id: 4,
      name: "PLACEHOLDER",
      imageUrl: "https://placehold.co/600x300",
      url: "https://placehold.co/600x300",
      isVip: true
    },
    {
      id: 5,
      name: "PLACEHOLDER",
      imageUrl: "https://placehold.co/600x300",
      url: "https://placehold.co/600x300",
      isVip: true
    }
  ];

  constructor(private http: HttpClient) {
    this.getSponsors().subscribe({
      next: (sponsors) => {
        if (sponsors && sponsors.length > 0) {
          this.sponsors = sponsors;
        } else {
          this.sponsors = this.sponsorPlaceholders;
        }
      },
      error: () => {
        this.sponsors = this.sponsorPlaceholders;
      }
    });
  }

  private getSponsors(): Observable<Sponsor[]> {
    return this.http.get<Sponsor[]>(this.apiUrl);
  }

  public getVipSponsors() : Sponsor[] {
    return this.sponsors.filter(x => x.isVip).slice(0, 5);
  }
}
