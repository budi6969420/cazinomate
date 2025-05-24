import {GameDifficulty} from "../enums/gameDifficulty";
import {Interaction} from "../enums/interaction";

export class BaseGameInteractionRequest {
  gameId: string;
  sessionId: string;
  interaction: string;

  constructor(gameId: string, sessionId: string, interaction: Interaction) {
    this.gameId = gameId;
    this.sessionId = sessionId;
    this.interaction = Interaction[interaction];
  }
}
