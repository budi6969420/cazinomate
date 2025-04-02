import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, ReplaySubject, of } from "rxjs";
import { GameMetadata } from "../models/gameMetadata";
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameMetadataService {
  private apiUrl = 'http://localhost:8080/api/game';
  gameMetadatas: GameMetadata[] = [];
  gameMetadatasFallback: GameMetadata[] = [
    {"id":"39c63177-b7ad-478b-a009-69b8fa043e6f","title":"Crossy Road Gang! Bang!","previewImageUrl":"https://static.wikia.nocookie.net/crossyroad/images/7/73/CrossyRoad_Chicken_x_AmongUs_RedCrewmate.png/revision/latest?cb=20240924183713", "previewHexColor": "#FFF"},
    {"id":"92ed9e52-afd8-49a5-8b09-d7a049783725","title":"The Lucky Crewmate","previewImageUrl":"https://cdn.vectorstock.com/i/500p/28/62/casino-slot-machine-777-jackpot-winning-game-vector-23732862.jpg", "previewHexColor": "#FFF"}
  ];

  constructor(private http: HttpClient) {
    this.http.get<GameMetadata[]>(this.apiUrl).pipe(
      tap(games => {
        this.gameMetadatas = games;
      }),
      catchError((error) => {
        this.gameMetadatas = this.gameMetadatasFallback;
        return of(this.gameMetadatasFallback);
      })
    ).subscribe({});
  }

  getGameMetadatas(): GameMetadata[] {
    return this.gameMetadatas;
  }
}
