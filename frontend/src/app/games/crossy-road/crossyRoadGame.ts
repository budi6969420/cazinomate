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
  GAME_NAME: string = "crossy-road";
  GAME_ID: string = "39c63177-b7ad-478b-a009-69b8fa043e6f";
  GAME_STATE: GameState = GameState.INACTIVE;
  GAME_CURRENT_GAINS: number = 0;

  playgroundScreen!: Playground;
  endDialogueScreen!: EndDialogue;

  GAME_HEIGHT: number;
  GAME_WIDTH: number;
  GAME_SCREEN_WIDTH: number;
  GAME_SCREEN_HEIGHT: number;

  private gameWasAlreadyInitialisedBefore: boolean = false;

  constructor(GAME_HEIGHT: number,GAME_WIDTH: number, GAME_SCREEN_HEIGHT: number, GAME_SCREEN_WIDTH: number) {
    super();
    this.GAME_HEIGHT = GAME_HEIGHT;
    this.GAME_WIDTH = GAME_WIDTH;
    this.GAME_SCREEN_HEIGHT = GAME_SCREEN_HEIGHT;
    this.GAME_SCREEN_WIDTH = GAME_SCREEN_WIDTH
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

  private gameStateCheckingLoop(){

    switch(this.GAME_STATE){
      case GameState.LOST:
        this.endDialogueScreen.showPlayerLost();
        break;
      case GameState.WON:
        this.endDialogueScreen.showPlayerWon(this.GAME_CURRENT_GAINS);
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

  getInteractionForPressedKey(event: KeyboardEvent): Interaction {
    let interaction: Interaction;

    switch (event.code){
      case "Enter":
        interaction = Interaction.MOVE;
        break;
      default:
        interaction = Interaction.MOVE;
    }

    return interaction;
  }

  public getName(){
    return this.GAME_NAME;
  }
  public getId() {
    return this.GAME_ID
  }
}
