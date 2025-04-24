import {Injectable, Type} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, ReplaySubject } from "rxjs";
import { GameMetadata } from "../models/gameMetadata";
import {CrossyRoadGangBangComponent} from "../games/crossy-road-gang-bang/crossy-road-gang-bang.component";
import {TheLuckyCrewmateComponent} from "../games/the-lucky-crewmate/the-lucky-crewmate.component";

@Injectable({
  providedIn: 'root'
})
export class GameMetadataService {
  private apiUrl = 'http://localhost:8080/api/game';
  gameMetadatas: GameMetadata[] = [];
  private dataLoadedSubject = new ReplaySubject<GameMetadata[]>(1);
  public dataLoaded$: Observable<GameMetadata[]> = this.dataLoadedSubject.asObservable();

  public gameComponentRegistry = new Map<string, Type<any>>([
    ['39c63177-b7ad-478b-a009-69b8fa043e6f', CrossyRoadGangBangComponent],
    ['92ed9e52-afd8-49a5-8b09-d7a049783725', TheLuckyCrewmateComponent]
  ]);

  gameMetadatasPlacholders: GameMetadata[] = [
    {
      "id":"39c63177-b7ad-478b-a009-69b8fa043e6f",
      "title":"Crossy Road Gang! Bang!",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
      "previewImageUrl":"https://static.wikia.nocookie.net/crossyroad/images/7/73/CrossyRoad_Chicken_x_AmongUs_RedCrewmate.png/revision/latest?cb=20240924183713",
      "loadingIconUrl": "/images/cazinomate-logo.svg",
      "previewHexColor": "#F00"
    },
    {
      "id":"92ed9e52-afd8-49a5-8b09-d7a049783725",
      "title":"The Lucky Crewmate",
      "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
      "previewImageUrl":"https://cdn.vectorstock.com/i/500p/28/62/casino-slot-machine-777-jackpot-winning-game-vector-23732862.jpg",
      "loadingIconUrl": "/images/cazinomate-logo.svg",
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

  private getGameMetadataById(): Observable<GameMetadata[]> {
    return this.http.get<GameMetadata[]>(this.apiUrl);
  }

  private getGameMetadatas(): Observable<GameMetadata[]> {
    return this.http.get<GameMetadata[]>(this.apiUrl);
  }
}
