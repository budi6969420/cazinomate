import {Container, Graphics} from "pixi.js";
import {CrossyRoadGameVariables} from "../crossyRoadGameVariables";
import {RoadTrack} from "./roadTrack";

export class ControlBar extends Container{
  constructor() {
    super();
    this.position.y = CrossyRoadGameVariables.GAME_SCREEN_HEIGHT;
    this.position.x = 0;

    let background = new Graphics().rect(0,0, CrossyRoadGameVariables.GAME_SCREEN_WIDTH, 242).fill("#181A39");
    this.addChild(background);
  }
}
