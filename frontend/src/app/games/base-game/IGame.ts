import {BaseGameSession} from "./dtos/BaseGameSession";
import {Interaction} from "./enums/interaction";
import {GameState} from "./enums/gameState";

export interface IGame{
  readonly GAME_NAME: string;
  readonly GAME_ID: string;
  readonly GAME_HEIGHT: number;
  readonly GAME_WIDTH: number;
  readonly GAME_SCREEN_WIDTH: number;
  readonly GAME_SCREEN_HEIGHT: number;
  GAME_STATE: GameState
  GAME_CURRENT_GAINS: number;

  start(gameSession?: BaseGameSession): void;
  getInteractionForPressedKey(event: KeyboardEvent): Interaction;
  processInteraction(interaction: Interaction, gameSession: BaseGameSession): Promise<void>;
  getName(): string;
  getId(): string;
}
