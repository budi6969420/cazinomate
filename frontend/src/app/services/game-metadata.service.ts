import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {GameMetadata} from "../models/gameMetadata";

@Injectable({
  providedIn: 'root'
})
export class GameMetadataService {
  private apiUrl = 'http://localhost:8080/api/game'; // API endpoint

  constructor(private http: HttpClient) { }

  getGameMatadatas(): Observable<GameMetadata[]> {
    return this.http.get<GameMetadata[]>(this.apiUrl);
  }
}
