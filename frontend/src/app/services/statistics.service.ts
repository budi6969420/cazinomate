import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {GameStatistics} from "../models/GameStatistics";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private baseUrl = environment.backendApiUrl + 'statistics/';

  constructor(private http: HttpClient) { }

  getGlobalGameStatistics(): Observable<GameStatistics[]> {
    return this.http.get<GameStatistics[]>(this.baseUrl + 'global');
  }

  getSelfGameStatistics(): Observable<GameStatistics[]> {
    return this.http.get<GameStatistics[]>(this.baseUrl + 'self');
  }
}
