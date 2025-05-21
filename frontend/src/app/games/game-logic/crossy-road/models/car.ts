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
    this.anchor.y = 1;
    this.anchor.x = 0.5;
    this.position.y = this.height *-1;
    this.position.x = ((CrossyRoadGameVariables.ROAD_TRACK_WIDTH - this.width) / 2) + (this.width/2);
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
    this.position.y = 0;
    this.setRandomTexture();

    gsap
      .to(this.position, {
        y: CrossyRoadGameVariables.GAME_SCREEN_HEIGHT + this.height,
        duration: 2+ Math.floor(Math.random() * 2),
        ease: "none",
        onComplete: () => {this.isDriving = false}
      });
  }

  async killChicken(): Promise<void>{
    this.position.y = 0;
    this.setRandomTexture();

    let duration = 0.5;
    let delay = 1.5;
    let timeline = gsap.timeline();
    timeline
      .to(this.position, {
        y: CrossyRoadGameVariables.CHICKEN_PADDING_TOP + 180,
        delay: delay,
        duration: duration,
        ease: "power2.in",
        onComplete: () => {}
      })
      .to(this.position, {
      y: CrossyRoadGameVariables.CHICKEN_PADDING_TOP + 160,
      duration: 0.2,
      ease: "power2.out",
      onComplete: () => {}
    });

    return await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, (delay+duration)*1000);
    });
  }
}
