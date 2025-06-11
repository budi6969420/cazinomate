import {Container, Ticker} from "pixi.js";
import {IGame} from "../base-game/IGame";
import {BaseGameSession} from "../base-game/dtos/BaseGameSession";
import {GameState} from "../base-game/enums/gameState";
import {Interaction} from "../base-game/enums/interaction";
import {Playground} from "./elements/playground";
import {EndDialogue} from "./elements/endDialogue";
import {CrossyRoadGameSession} from "../crossy-road/dtos/crossyRoadGameSession";
import {UserService} from "../../services/user.service";

export class CoinFlipGame extends Container implements IGame {

  readonly GAME_HEIGHT: number;
  readonly GAME_WIDTH: number;

  private gameState: GameState = GameState.INACTIVE;
  private currentGains: number = 0;
  private gameWasAlreadyInitialisedBefore = false;

  private playgroundScreen!: Playground;
  private endDialogueScreen!: EndDialogue;

  constructor(GAME_HEIGHT: number, GAME_WIDTH: number, private userService: UserService) {
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

  private gameStateCheckingLoop(){

    switch(this.gameState){
      case GameState.LOST:
        this.endDialogueScreen.showPlayerLost();
        break;
      case GameState.WON:
        this.userService.updateSelfBalance().subscribe();
        this.endDialogueScreen.showPlayerWon(this.currentGains);
        break;
      case GameState.ACTIVE:
        this.endDialogueScreen.hide();
        break;
      case GameState.INACTIVE:
        this.playgroundScreen.hideCoin();
    }
  }

  override destroy(options?: boolean): void {
    Ticker.shared.remove(this.gameStateCheckingLoop, this);

    if (this.playgroundScreen) {
      this.removeChild(this.playgroundScreen);
      this.playgroundScreen.destroy(options);
    }

    if (this.endDialogueScreen) {
      this.removeChild(this.endDialogueScreen);
      this.endDialogueScreen.destroy(options);
    }

    this.gameWasAlreadyInitialisedBefore = false;

    super.destroy(options);
  }


  getCurrentGains(): number {
    return this.currentGains;
  }

  getGameState(): GameState {
    return this.gameState;
  }

  getId(): string {
    return "coin-flip";
  }

  getInteractionForPressedKey(event: KeyboardEvent): Interaction {
    let interaction: Interaction;

    switch (event.code){
      case "Enter":
        interaction = Interaction.PLAY;
        break;
      default:
        interaction = Interaction.NONE;
    }

    return interaction;
  }

  getSupportsMidGamePayout(): boolean {
    return false;
  }

  async processInteraction(interaction: Interaction, gameSession: BaseGameSession){
    if(this.gameState != GameState.ACTIVE) return;

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
