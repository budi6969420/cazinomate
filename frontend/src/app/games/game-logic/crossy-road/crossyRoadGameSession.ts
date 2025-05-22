import {BaseGameSession} from "../BaseGameSession";
import {GameDifficulty, GameState} from "./crossyRoadGameVariables";

export class CrossyRoadGameSession extends BaseGameSession {
  public currentIndex:number;
  public balanceDifference: number;
  public prizeIndexValues: string[];

  constructor(id: string,
              gameId: string,
              userId: string,
              investedBalance: number,
              gameState: GameState,
              difficulty: GameDifficulty,
              currentIndex: number,
              balanceDifference: number,
              prizeIndexValues: string[]) {
    super(id, gameId, userId, investedBalance, gameState, difficulty);
    this.currentIndex = currentIndex;
    this.balanceDifference = balanceDifference;
    this.prizeIndexValues = prizeIndexValues;
  }
}
