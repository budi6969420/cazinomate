import {BaseGameSession} from "../../base-game/dtos/BaseGameSession";
import {GameDifficulty} from "../../base-game/enums/gameDifficulty";
import {GameState} from "../../base-game/enums/gameState";

export class CrossyRoadGameSession extends BaseGameSession {
  public currentIndex:number;
  public prizeIndexValues: number[];

  constructor(id: string,
              gameId: string,
              userId: string,
              investedBalance: number,
              gameState: string,
              difficulty: GameDifficulty,
              currentIndex: number,
              balanceDifference: number,
              prizeIndexValues: number[]) {
    super(id, gameId, userId, investedBalance, balanceDifference, gameState, difficulty);
    this.currentIndex = currentIndex;
    this.prizeIndexValues = prizeIndexValues;
  }
}
