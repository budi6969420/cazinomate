import {Container, Sprite} from "pixi.js";
import {CrossyRoadGameVariables} from "../crossyRoadGameVariables";

export class RoadTrack extends Container {
  TEXTURE_LEFT: string = "roadtrack_left";
  TEXTURE_RIGHT: string = "roadtrack_right";

  constructor(texture: boolean = true) {
    super();

    const streetBackground = Sprite.from(texture ? this.TEXTURE_LEFT : this.TEXTURE_RIGHT);
    streetBackground.position.set(0, 0);
    streetBackground.width = CrossyRoadGameVariables.ROAD_TRACK_WIDTH;
    streetBackground.height = CrossyRoadGameVariables.GAME_SCREEN_HEIGHT;

    this.addChild(streetBackground)
  }
}
