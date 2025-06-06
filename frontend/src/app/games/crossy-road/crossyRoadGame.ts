import {IGame} from "../base-game/IGame";
import {Container, Ticker} from "pixi.js";
import {Playground} from "./elements/playground";
import {EndDialogue} from "./elements/endDialogue";
import {BaseGameSession} from "../base-game/dtos/BaseGameSession";
import {CrossyRoadGameSession} from "./dtos/crossyRoadGameSession";
import {Interaction} from "../base-game/enums/interaction";
import {GameState} from "../base-game/enums/gameState";
import {CrossyRoadGameVariables} from "./crossyRoadGameVariables";

export class CrossyRoadGame extends Container implements IGame{
  private readonly GAME_NAME: string = "crossy-road";
  private readonly GAME_ID: string = "39c63177-b7ad-478b-a009-69b8fa043e6f";
  private gameState: GameState = GameState.INACTIVE;
  private currentGains: number = 0;

  private playgroundScreen!: Playground;
  private endDialogueScreen!: EndDialogue;

  readonly GAME_HEIGHT: number;
  readonly GAME_WIDTH: number;

  private gameWasAlreadyInitialisedBefore: boolean = false;

  constructor(GAME_HEIGHT: number,GAME_WIDTH: number) {
    super();
    this.GAME_HEIGHT = GAME_HEIGHT;
    this.GAME_WIDTH = GAME_WIDTH;
  }

  start(gameSession?: CrossyRoadGameSession){
    if(gameSession){
      CrossyRoadGameVariables.GAME_SETTING_ROAD_TRACK_AMOUNT = gameSession.prizeIndexValues.length;
      CrossyRoadGameVariables.GAME_SETTING_INITIAL_CHICKEN_INDEX = gameSession.currentIndex;
      CrossyRoadGameVariables.GAME_SETTING_PRIZES_PER_FIELD = gameSession.prizeIndexValues;
    }

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

  async end(gameSession: CrossyRoadGameSession){
    if(gameSession.wouldHaveLostAtIndex>=0) {
      await this.playgroundScreen.scrollToDeathField(gameSession.wouldHaveLostAtIndex);
    }
    else{
      this.playgroundScreen.setAllFieldsToVisited();
      await this.playgroundScreen.scrollToMaxWidth();
    }
    this.setGameState(GameState.WON);
  }

  private gameStateCheckingLoop(){
    switch(this.gameState){
      case GameState.LOST:
        this.endDialogueScreen.showPlayerLost();
        break;
      case GameState.WON:
        this.endDialogueScreen.showPlayerWon(this.currentGains);
        break;
      case GameState.ACTIVE:
        this.endDialogueScreen.hide();
        break;
    }
  }

  async processInteraction(interaction: Interaction, gameSession: BaseGameSession){
    switch (interaction) {
      case Interaction.MOVE:
        return await this.playgroundScreen.nextMove(gameSession as CrossyRoadGameSession);
      default:
        break;
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

  getInteractionForPressedKey(event: KeyboardEvent): Interaction {
    let interaction: Interaction;

    switch (event.code){
      case "Enter":
        interaction = Interaction.MOVE;
        break;
      default:
        interaction = Interaction.NONE;
    }

    return interaction;
  }
  public getName(){
    return this.GAME_NAME;
  }
  public getId() {
    return this.GAME_ID;
  }
  public getGameState(): GameState {
    return this.gameState;
  }
  public getCurrentGains(): number {
    return this.currentGains;
  }
  public setGameState(gameState: GameState) {
    this.gameState = gameState;
  }
  public setCurrentGains(gains: number) {
    this.currentGains = gains;
  }
  getSupportsMidGamePayout(): boolean {
    return true;
  }
}
