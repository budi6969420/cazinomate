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
  constructor(private http: HttpClient) {
    this.getSponsors().subscribe({
      next: (sponsors) => {
        if (sponsors && sponsors.length > 0) {
          this.sponsors = sponsors;
        }
      },
    });
  }

  private getSponsors(): Observable<Sponsor[]> {
    return this.http.get<Sponsor[]>(this.apiUrl);
  }
}
