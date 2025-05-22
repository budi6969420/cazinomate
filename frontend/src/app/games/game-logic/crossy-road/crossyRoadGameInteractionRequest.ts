import {GameDifficulty} from "./crossyRoadGameVariables";

export class CrossyRoadGameInteractionRequest {
  gameId: string;
  sessionId: string;
  interaction: string;

  constructor(gameId: string, sessionId: string, interaction: string) {
    this.gameId = gameId;
    this.sessionId = sessionId;
    this.interaction = interaction;
  }
}
