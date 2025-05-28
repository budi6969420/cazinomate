import {BaseGameSession} from "../../base-game/dtos/BaseGameSession";
import {GameDifficulty} from "../../base-game/enums/gameDifficulty";

export class CrossyRoadGameSession extends BaseGameSession {
  public currentIndex:number;
  public prizeIndexValues: number[];
  public wouldHaveLostAtIndex: number;

  constructor(id: string,
              gameId: string,
              userId: string,
              investedBalance: number,
              gameState: string,
              difficulty: GameDifficulty,
              currentIndex: number,
              balanceDifference: number,
              prizeIndexValues: number[],
              wouldHaveLostAtIndex: number) {
    super(id, gameId, userId, investedBalance, balanceDifference, gameState, difficulty);
    this.currentIndex = currentIndex;
    this.prizeIndexValues = prizeIndexValues;
    this.wouldHaveLostAtIndex = wouldHaveLostAtIndex;
  }
}
