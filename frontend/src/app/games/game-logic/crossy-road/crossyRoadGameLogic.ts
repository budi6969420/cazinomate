import {IGameLogic} from "../iGameLogic";
import {Container, Ticker} from "pixi.js";
import {Playground} from "./models/playground";
import {CrossyRoadGameVariables, GameState} from "./crossyRoadGameVariables";
import {EndDialogue} from "./models/endDialogue";
import {ControlBar} from "./models/controlBar";

export class CrossyRoadGameLogic implements IGameLogic{
  name: string = "crossy-road";
  gameWasInitialised: boolean = false;
  stage!: Container<any>
  playgroundScreen!: Playground;
  endDialogueScreen!: EndDialogue;
  controlBar!: ControlBar;

  GAME_HEIGHT: number;
  GAME_WIDTH: number;

  constructor(GAME_HEIGHT: number,GAME_WIDTH: number) {
    this.GAME_HEIGHT = GAME_HEIGHT;
    this.GAME_WIDTH = GAME_WIDTH;

    window.addEventListener('keydown', (event: KeyboardEvent) => {
      this.controller(event);
    });
  }

  start(){
    if (this.playgroundScreen){
      this.stage.removeChild(this.playgroundScreen);
      this.stage.removeChild(this.endDialogueScreen);
      this.stage.removeChild(this.controlBar);

      this.playgroundScreen.destroy();
    }

    this.playgroundScreen = new Playground();
    this.playgroundScreen.setMaxScrollX(this.GAME_WIDTH);

    if(!this.gameWasInitialised){
      this.endDialogueScreen = new EndDialogue();
      this.controlBar = new ControlBar();

      Ticker.shared.add(this.gameStateCheckingLoop, this);
      this.gameWasInitialised = true;
    }

    this.stage.addChild(this.playgroundScreen);
    this.stage.addChild(this.endDialogueScreen);
    this.stage.addChild(this.controlBar);

    CrossyRoadGameVariables.GAME_STATE = GameState.RUNNING;
  }

  private gameStateCheckingLoop(){
    switch(CrossyRoadGameVariables.GAME_STATE){
      case GameState.LOST:
        this.endDialogueScreen.showPlayerLost()
        break;
      case GameState.WON:
        this.endDialogueScreen.showPlayerWon()
        break;
      case GameState.RUNNING:
        this.endDialogueScreen.hide();
    }
  }

  controller(eventOrCommand: KeyboardEvent | string): void {
    let commandCode: string;
    typeof eventOrCommand === 'string' ? commandCode = eventOrCommand : commandCode = eventOrCommand.code;

    switch (commandCode) {
      case CrossyRoadGameVariables.COMMAND_MOVE_CHICKEN_FORWARD:
        this.playgroundScreen.actionTrigger();
        break;

      case CrossyRoadGameVariables.COMMAND_START_GAME:
        if(CrossyRoadGameVariables.GAME_STATE != GameState.RUNNING) this.start();
        break;

      default:
        break;
    }
  }

  getName(): string {
    return this.name;
  }

  setStage(stage: Container<any>){
    this.stage = stage;
  }
}
