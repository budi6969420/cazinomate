import {BaseGameSession} from "./dtos/BaseGameSession";
import {Interaction} from "./enums/interaction";
import {GameState} from "./enums/gameState";

export interface IGame{
  readonly GAME_HEIGHT: number;
  readonly GAME_WIDTH: number;

  start(gameSession?: BaseGameSession): void;
  end(gameSession: BaseGameSession): void;
  getInteractionForPressedKey(event: KeyboardEvent): Interaction;
  processInteraction(interaction: Interaction, gameSession: BaseGameSession): Promise<void>;

  getName(): string;
  getId(): string;
  getGameState(): GameState;
  getCurrentGains(): number;
  getSupportsMidGamePayout(): boolean;

  setGameState(gameState: GameState): void;
  setCurrentGains(gains: number): void;

  destroy(options?: boolean) : void;
}
