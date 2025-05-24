import {Injectable, Type} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, ReplaySubject } from "rxjs";
import { GameMetadata } from "../models/gameMetadata";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GameMetadataService {
  private apiUrl = environment.backendApiUrl + 'game';
  gameMetadatas: GameMetadata[] = [];
  private dataLoadedSubject = new ReplaySubject<GameMetadata[]>(1);
  public dataLoaded$: Observable<GameMetadata[]> = this.dataLoadedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.getGameMetadatas().subscribe({
      next: (gameMetadatas) => {
        if (gameMetadatas && gameMetadatas.length > 0) {
          this.gameMetadatas = gameMetadatas;
        }
        this.dataLoadedSubject.next(this.gameMetadatas);
      }
    });
  }

  private getGameMetadatas(): Observable<GameMetadata[]> {
    return this.http.get<GameMetadata[]>(this.apiUrl);
  }
}
