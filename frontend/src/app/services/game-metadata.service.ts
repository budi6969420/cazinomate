import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, ReplaySubject } from "rxjs";
import { GameMetadata } from "../models/gameMetadata";

@Injectable({
  providedIn: 'root'
})
export class GameMetadataService {
  private apiUrl = 'http://localhost:8080/api/game';
  gameMetadatas: GameMetadata[] = [];
  private dataLoadedSubject = new ReplaySubject<GameMetadata[]>(1);
  public dataLoaded$: Observable<GameMetadata[]> = this.dataLoadedSubject.asObservable();
  gameMetadatasPlacholders: GameMetadata[] = [
    {
      "id":"39c63177-b7ad-478b-a009-69b8fa043e6f",
      "title":"Crossy Road Gang! Bang!",
      "previewImageUrl":"https://static.wikia.nocookie.net/crossyroad/images/7/73/CrossyRoad_Chicken_x_AmongUs_RedCrewmate.png/revision/latest?cb=20240924183713",
      "previewHexColor": "#F00"
    },
    {
      "id":"92ed9e52-afd8-49a5-8b09-d7a049783725",
      "title":"The Lucky Crewmate",
      "previewImageUrl":"https://cdn.vectorstock.com/i/500p/28/62/casino-slot-machine-777-jackpot-winning-game-vector-23732862.jpg",
      "previewHexColor": "#00F"
    }
  ];

  constructor(private http: HttpClient) {
    this.getGameMetadatas().subscribe({
      next: (gameMetadatas) => {
        if (gameMetadatas && gameMetadatas.length > 0) {
          this.gameMetadatas = gameMetadatas;
        } else {
          this.gameMetadatas = this.gameMetadatasPlacholders;
        }
        this.dataLoadedSubject.next(this.gameMetadatas);
      },
      error: () => {
        this.gameMetadatas = this.gameMetadatasPlacholders;
        this.dataLoadedSubject.next(this.gameMetadatas);
      }
    });
  }

  private getGameMetadatas(): Observable<GameMetadata[]> {
    return this.http.get<GameMetadata[]>(this.apiUrl);
  }
}
