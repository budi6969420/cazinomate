import {IGameLogic} from "../iGameLogic";
import {Container, Sprite} from "pixi.js";
import {Playground} from "./models/playground";
import {CrossyRoadGameVariables} from "./crossyRoadGameVariables";

export class CrossyRoadGameLogic implements IGameLogic{
  name: string = "crossy-road";
  stage!: Container<any>
  playgroundScreen!: Playground;

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
    if (this.playgroundScreen) this.stage.removeChild(this.playgroundScreen);

    this.playgroundScreen = new Playground();
    this.playgroundScreen.setMaxScrollX(this.GAME_WIDTH);
    this.stage.addChild(this.playgroundScreen)
  }

  public controller(eventOrCommand: KeyboardEvent | string): void {
    let commandCode: string;
    typeof eventOrCommand === 'string' ? commandCode = eventOrCommand : commandCode = eventOrCommand.code;

    switch (commandCode) {
      case CrossyRoadGameVariables.COMMAND_MOVE_CHICKEN_FORWARD:
        if (this.playgroundScreen.isScrolling || !this.playgroundScreen.chicken.getIsEffectivelyAlive()) break;
        this.playgroundScreen.chicken.walk();
        this.playgroundScreen.alignView();
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
