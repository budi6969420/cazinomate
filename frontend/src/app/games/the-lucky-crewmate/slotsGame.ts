import {Container} from "pixi.js";
import {IGame} from "../base-game/IGame";
import {BaseGameSession} from "../base-game/dtos/BaseGameSession";
import {Interaction} from "../base-game/enums/interaction";
import {GameState} from "../base-game/enums/gameState";
import {Playground} from "./elements/playground";


export class SlotsGame extends Container implements IGame {
  private playgroundScreen!: Playground;

  constructor(GAME_HEIGHT: number, GAME_WIDTH: number) {
    super();
    this.GAME_HEIGHT = GAME_HEIGHT;
    this.GAME_WIDTH = GAME_WIDTH;
  }

  readonly GAME_HEIGHT: number;
  readonly GAME_WIDTH: number;

  start(gameSession?: BaseGameSession): void {
    this.playgroundScreen = new Playground(this);
    this.addChild(this.playgroundScreen);
  }

  end(gameSession: BaseGameSession): void {

  }

  getInteractionForPressedKey(event: KeyboardEvent): Interaction {
    return {} as Interaction;
  }

  async processInteraction(interaction: Interaction, gameSession: BaseGameSession): Promise<void> {
  }

  getName(): string {
    return "the-lucky-crewmate";
  }

  getId(): string {
    return "92ed9e52-afd8-49a5-8b09-d7a049783725"
  }

  getGameState(): GameState {
    return GameState.INACTIVE;
  }

  getCurrentGains(): number {
    return 0;
  }

  getIsGamePlayable(): boolean {
    return false;
  }

  setGameState(gameState: GameState): void {

  }

  setCurrentGains(gains: number): void {

  }

}
