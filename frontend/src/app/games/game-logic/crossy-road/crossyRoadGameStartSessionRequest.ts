import {GameDifficulty} from "./crossyRoadGameVariables";

export class CrossyRoadGameStartSessionRequest {
  gameId: string;
  difficulty: GameDifficulty;
  investedBalance: number

  constructor(gameId: string, difficulty: GameDifficulty, investedBalance: number) {
    this.gameId = gameId;
    this.difficulty = difficulty;
    this.investedBalance = investedBalance;
  }
}
