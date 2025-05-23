import {GameDifficulty} from "../enums/gameDifficulty";
import {GameState} from "../enums/gameState";

export class BaseGameSession{
  public id: string;
  public gameId: string;
  public userId: string;
  public investedBalance: number;
  public balanceDifference: number;
  public gameState: string;
  public difficulty: GameDifficulty;

  constructor(id: string, gameId: string, userId: string, investedBalance: number, balanceDifference: number, gameState: string, difficulty: GameDifficulty) {
    this.id = id;
    this.gameId = gameId;
    this.userId = userId;
    this.investedBalance = investedBalance;
    this.balanceDifference = balanceDifference;
    this.gameState = gameState;
    this.difficulty = difficulty;
  }
}
