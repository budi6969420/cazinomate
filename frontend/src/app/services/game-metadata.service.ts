import {Injectable, Type} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, ReplaySubject } from "rxjs";
import { GameMetadata } from "../models/gameMetadata";
import {CrossyRoadGangBangComponent} from "../games/crossy-road-gang-bang/crossy-road-gang-bang.component";
import {TheLuckyCrewmateComponent} from "../games/the-lucky-crewmate/the-lucky-crewmate.component";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GameMetadataService {
  private apiUrl = environment.backendApiUrl + 'game';
  gameMetadatas: GameMetadata[] = [];
  private dataLoadedSubject = new ReplaySubject<GameMetadata[]>(1);
  public dataLoaded$: Observable<GameMetadata[]> = this.dataLoadedSubject.asObservable();

  public gameComponentRegistry = new Map<string, Type<any>>([
    ['39c63177-b7ad-478b-a009-69b8fa043e6f', CrossyRoadGangBangComponent],
    ['92ed9e52-afd8-49a5-8b09-d7a049783725', TheLuckyCrewmateComponent]
  ]);

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
