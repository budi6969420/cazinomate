import {IGameLogic} from "../iGameLogic";
import {Container, Sprite} from "pixi.js";
import {Playground} from "./models/playground";
import {CrossyRoadGameVariables} from "./crossyRoadGameVariables";
import {EventEmitter} from "@angular/core";
import {EndDialogue} from "./models/endDialogue";

export class CrossyRoadGameLogic implements IGameLogic{
  name: string = "crossy-road";
  stage!: Container<any>
  playgroundScreen!: Playground;
  endDialogueScreen!: EndDialogue;

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
      this.playgroundScreen.destroy();

      this.stage.removeChild(this.endDialogueScreen);
      this.endDialogueScreen.destroy();
    }

    this.playgroundScreen = new Playground();
    this.playgroundScreen.setMaxScrollX(this.GAME_WIDTH);

    this.endDialogueScreen = new EndDialogue(false);

    this.stage.addChild(this.playgroundScreen)
    this.stage.addChild(this.endDialogueScreen)
  }

  public controller(eventOrCommand: KeyboardEvent | string): void {
    let commandCode: string;
    typeof eventOrCommand === 'string' ? commandCode = eventOrCommand : commandCode = eventOrCommand.code;

    switch (commandCode) {
      case CrossyRoadGameVariables.COMMAND_MOVE_CHICKEN_FORWARD:
        this.playgroundScreen.actionTrigger();
        break;

      case CrossyRoadGameVariables.COMMAND_START_GAME:
        this.start();
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
