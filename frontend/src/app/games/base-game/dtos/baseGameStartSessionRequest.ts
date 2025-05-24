import {GameDifficulty} from "../enums/gameDifficulty";

export class BaseGameStartSessionRequest {
  gameId: string;
  difficulty: GameDifficulty;
  investedBalance: number

  constructor(gameId: string, difficulty: GameDifficulty, investedBalance: number) {
    this.gameId = gameId;
    this.difficulty = difficulty;
    this.investedBalance = investedBalance;
  }
}
