import {GameDifficulty} from "../../base-game/enums/gameDifficulty";
import {Interaction} from "../../base-game/enums/interaction";

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
