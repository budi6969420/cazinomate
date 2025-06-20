import {IGame} from "../base-game/IGame";
import {Container, Ticker} from "pixi.js";
import {Playground} from "./elements/playground";
import {EndDialogue} from "./elements/endDialogue";
import {BaseGameSession} from "../base-game/dtos/BaseGameSession";
import {CrossyRoadGameSession} from "./dtos/crossyRoadGameSession";
import {Interaction} from "../base-game/enums/interaction";
import {GameState} from "../base-game/enums/gameState";
import {CrossyRoadGameVariables} from "./crossyRoadGameVariables";
import {UserService} from "../../services/user.service";

export class CrossyRoadGame extends Container implements IGame{
  private readonly GAME_ID: string = "crossy-road";
  private gameState: GameState = GameState.INACTIVE;
  private currentGains: number = 0;

  private playgroundScreen!: Playground;
  private endDialogueScreen!: EndDialogue;

  readonly GAME_HEIGHT: number;
  readonly GAME_WIDTH: number;

  private gameWasAlreadyInitialisedBefore: boolean = false;

  constructor(GAME_HEIGHT: number,GAME_WIDTH: number, private userService: UserService) {
    super();
    this.GAME_HEIGHT = GAME_HEIGHT;
    this.GAME_WIDTH = GAME_WIDTH;
  }

  start(gameSession?: CrossyRoadGameSession){
    if(gameSession){
      CrossyRoadGameVariables.GAME_SETTING_ROAD_TRACK_AMOUNT = gameSession.prizeIndexValues.length;
      CrossyRoadGameVariables.GAME_SETTING_INITIAL_CHICKEN_INDEX = gameSession.currentIndex;
      CrossyRoadGameVariables.GAME_SETTING_PRIZES_PER_FIELD = gameSession.prizeIndexValues;
      this.currentGains = gameSession.balanceDifference - gameSession.investedBalance;
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
      await this.playgroundScreen.setAllFieldsToVisited();
      await this.playgroundScreen.scrollToMaxWidth();
    }
    this.setGameState(GameState.WON);
  }

  private gameStateCheckingLoop(){
    switch(this.gameState){
      case GameState.LOST:
        this.endDialogueScreen.showPlayerLost();
        this.gameState = GameState.INACTIVE;
        break;
      case GameState.WON:
        this.userService.updateSelfBalance().subscribe();
        this.endDialogueScreen.showPlayerWon(this.currentGains);
        this.gameState = GameState.INACTIVE;
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
