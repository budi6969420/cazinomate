import {Injectable, Type} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, ReplaySubject } from "rxjs";
import { GameMetadata } from "../models/gameMetadata";
import {environment} from "../../environments/environment";
import {IGame} from "../games/base-game/IGame";
import {CrossyRoadGame} from "../games/crossy-road/crossyRoadGame";
import {GameConstants} from "../games/gameConstants";
import {SlotsGame} from "../games/the-lucky-crewmate/slotsGame";
import {CoinFlipGame} from "../games/coin-flip/coinFlipGame";
import {Container} from "pixi.js";

@Injectable({
  providedIn: 'root'
})
export class GameMetadataService {
  private apiUrl = environment.backendApiUrl + 'game';
  gameMetadatas: GameMetadata[] = [];
  gameObjects: IGame[] = [
    new CrossyRoadGame(GameConstants.APP_LOGICAL_HEIGHT, GameConstants.APP_LOGICAL_WIDTH),
    new CoinFlipGame(GameConstants.APP_LOGICAL_HEIGHT, GameConstants.APP_LOGICAL_WIDTH),
    new SlotsGame(GameConstants.APP_LOGICAL_HEIGHT, GameConstants.APP_LOGICAL_WIDTH)
  ]
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

  getGameObject(gameId: string): IGame | undefined {
    return this.gameObjects.find(game => game.getId() === gameId);
  }
}
