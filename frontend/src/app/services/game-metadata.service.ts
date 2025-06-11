import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, ReplaySubject } from "rxjs";
import { GameMetadata } from "../models/gameMetadata";
import {environment} from "../../environments/environment";
import {IGame} from "../games/base-game/IGame";
import {CrossyRoadGame} from "../games/crossy-road/crossyRoadGame";
import {GameConstants} from "../games/gameConstants";
import {SlotsGame} from "../games/slots/slotsGame";
import {CoinFlipGame} from "../games/coin-flip/coinFlipGame";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class GameMetadataService {
  private apiUrl = environment.backendApiUrl + 'game';
  gameMetadatas: GameMetadata[] = [];
  getPlayableGameMetadatas(): GameMetadata[] {
    return this.gameMetadatas.filter(g => g.playable);
  }
  gameObjects: IGame[];
  private dataLoadedSubject = new ReplaySubject<GameMetadata[]>(1);
  public dataLoaded$: Observable<GameMetadata[]> = this.dataLoadedSubject.asObservable();

  constructor(private http: HttpClient, private userService: UserService) {
    this.gameObjects = [
      new CrossyRoadGame(GameConstants.APP_LOGICAL_HEIGHT, GameConstants.APP_LOGICAL_WIDTH, this.userService),
      new CoinFlipGame(GameConstants.APP_LOGICAL_HEIGHT, GameConstants.APP_LOGICAL_WIDTH, this.userService),
      new SlotsGame(GameConstants.APP_LOGICAL_HEIGHT, GameConstants.APP_LOGICAL_WIDTH)
    ];
    this.getGameMetadatas().subscribe({
      next: (gameMetadatas) => {
        if (gameMetadatas && gameMetadatas.length > 0) {
          this.gameMetadatas = gameMetadatas.sort((a, b) => {
            if (a.playable === b.playable) return 0;
            return a.playable ? -1 : 1;
          });

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
