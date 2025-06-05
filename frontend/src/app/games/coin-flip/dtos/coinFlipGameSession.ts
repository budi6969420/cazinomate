import {BaseGameSession} from "../../base-game/dtos/BaseGameSession";
import {GameDifficulty} from "../../base-game/enums/gameDifficulty";

export class CoinFlipGameSession extends BaseGameSession {
  constructor(id: string,
              gameId: string,
              userId: string,
              investedBalance: number,
              gameState: string,
              difficulty: GameDifficulty,
              currentIndex: number,
              balanceDifference: number) {
    super(id, gameId, userId, investedBalance, balanceDifference, gameState, difficulty);
  }
}
