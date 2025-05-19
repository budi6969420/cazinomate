import {IGameLogic} from "../iGameLogic";
import {Container, Sprite} from "pixi.js";
import {Playground} from "./models/playground";

export class CrossyRoadGameLogic implements IGameLogic{
  name: string = "crossy-road";
  stage!: Container<any>
  playgroundScreen!: Playground;

  GAME_HEIGHT: number;
  GAME_WIDTH: number;

  constructor(GAME_HEIGHT: number,GAME_WIDTH: number) {
    this.GAME_HEIGHT = GAME_HEIGHT;
    this.GAME_WIDTH = GAME_WIDTH;
  }

  start(){
    this.playgroundScreen = new Playground();
    this.playgroundScreen.setMaxScrollX(this.GAME_WIDTH);

    this.stage.addChild(this.playgroundScreen)
  }

  getName(): string {
    return this.name;
  }

  setStage(stage: Container<any>){
    this.stage = stage;
  }
}
