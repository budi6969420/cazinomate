import {Sprite, Texture} from "pixi.js";
import {CrossyRoadGameVariables} from "../crossyRoadGameVariables";
import {gsap} from "gsap";

export class Brick extends Sprite{
  private isFalling: boolean = false;

  constructor() {
    super();

    this.texture = Texture.from("texture_brick_falling")
    this.position.y = CrossyRoadGameVariables.GAME_SCREEN_HEIGHT / 4;
    this.position.x = (CrossyRoadGameVariables.ROAD_TRACK_WIDTH - this.width) / 2
    this.height = 202;
    this.width = 500;
    this.visible = false;
  }

  fall(){
    if(this.isFalling) return;
    this.isFalling = true;
    this.visible = true;

    gsap.to(this.position, {
      y: CrossyRoadGameVariables.GAME_SCREEN_HEIGHT / 2,
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        this.texture = Texture.from("texture_brick_landed");
      }
    });
  }
}
