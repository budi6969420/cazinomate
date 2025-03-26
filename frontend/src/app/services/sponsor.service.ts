import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Sponsor} from "../models/sponsor";

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  private apiUrl = 'http://localhost:8080/api/sponsor'; // API endpoint

  constructor(private http: HttpClient) { }

  getSponsors(): Observable<Sponsor[]> {
    return this.http.get<Sponsor[]>(this.apiUrl);
  }
}
