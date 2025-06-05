import {Container, Ticker} from "pixi.js";
import {IGame} from "../base-game/IGame";
import {BaseGameSession} from "../base-game/dtos/BaseGameSession";
import {GameState} from "../base-game/enums/gameState";
import {Interaction} from "../base-game/enums/interaction";
import {Playground} from "./elements/playground";
import {EndDialogue} from "./elements/endDialogue";
import {CrossyRoadGameSession} from "../crossy-road/dtos/crossyRoadGameSession";

export class CoinFlipGame extends Container implements IGame {

  readonly GAME_HEIGHT: number;
  readonly GAME_WIDTH: number;

  private gameState: GameState = GameState.INACTIVE;
  private currentGains: number = 0;
  private gameWasAlreadyInitialisedBefore = false;

  private playgroundScreen!: Playground;
  private endDialogueScreen!: EndDialogue;

  constructor(GAME_HEIGHT: number, GAME_WIDTH: number) {
    super();

    this.GAME_HEIGHT = GAME_HEIGHT;
    this.GAME_WIDTH = GAME_WIDTH;
  }

  start(gameSession?: BaseGameSession): void {
    if (this.playgroundScreen){
      this.removeChild(this.playgroundScreen);
      this.playgroundScreen.destroy();
    }

    this.playgroundScreen = new Playground(this);
    this.addChild(this.playgroundScreen);

    if(!this.gameWasAlreadyInitialisedBefore){
      this.endDialogueScreen = new EndDialogue();
      this.addChild(this.endDialogueScreen);

      Ticker.shared.add(this.gameStateCheckingLoop, this);
      this.gameWasAlreadyInitialisedBefore = true;
    }
  }

  end(gameSession: BaseGameSession): void {
  }

  gameStateCheckingLoop() {

  }

  getCurrentGains(): number {
    return this.currentGains;
  }

  getGameState(): GameState {
    return this.gameState;
  }

  getId(): string {
    return "0b283c6d-b147-4d66-94a4-e120811d1cf0";
  }

  getInteractionForPressedKey(event: KeyboardEvent): Interaction {
    return Interaction.PLAY;
  }

  getName(): string {
    return "coin-flip";
  }

  getIsGamePlayable(): boolean {
    return true;
  }

  async processInteraction(interaction: Interaction, gameSession: BaseGameSession){
    switch(interaction) {
      case Interaction.PLAY:
        return await this.playgroundScreen.flipCoin(gameSession as CrossyRoadGameSession);
    }
  }

  setCurrentGains(gains: number): void {
    this.currentGains = gains;
  }

  setGameState(gameState: GameState): void {
    this.gameState = gameState;
  }
}
