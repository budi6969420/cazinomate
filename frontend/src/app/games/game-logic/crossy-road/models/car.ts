import {convertToList, Sprite, Texture} from "pixi.js";
import {gsap} from "gsap";
import {CrossyRoadGameVariables} from "../crossyRoadGameVariables";

export class Car extends Sprite {
  private texturesAliases: string[] = ["texture_car_red", "texture_car_blue", "texture_car_truck"];
  public isDriving: boolean = false;

  constructor() {
    super();
    this.height = 860;
    this.width = 491;
    this.position.y = this.height *-1;
    this.position.x = (CrossyRoadGameVariables.ROAD_TRACK_WIDTH - this.width) / 2;
    this.setRandomTexture();

  }

  setRandomTexture(){
    this.texture = Texture.from(
      this.texturesAliases[Math.floor(Math.random() * this.texturesAliases.length)]
    )
  }

  drive(){
    if (this.isDriving) return;

    this.isDriving = true;
    this.position.y = this.height *-1;
    this.setRandomTexture();

    gsap
      .to(this.position, {
        y: CrossyRoadGameVariables.GAME_SCREEN_HEIGHT,
        duration: 2+ Math.floor(Math.random() * 2),
        ease: "none",
        onComplete: () => {this.isDriving = false}
      });
  }
}
