import {GameDifficulty, GameState} from "./crossy-road/crossyRoadGameVariables";

export class BaseGameSession{
  public id: string;
  public gameId: string;
  public userId: string;
  public investedBalance: number;
  public gameState: GameState;
  public difficulty: GameDifficulty;

  constructor(id: string, gameId: string, userId: string, investedBalance: number, gameState: GameState, difficulty: GameDifficulty) {
    this.id = id;
    this.gameId = gameId;
    this.userId = userId;
    this.investedBalance = investedBalance;
    this.gameState = gameState;
    this.difficulty = difficulty;
  }
}
