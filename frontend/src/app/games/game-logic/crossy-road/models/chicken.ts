import {Sprite, Texture} from "pixi.js";
import {Playground} from "./playground";

export class Chicken extends Sprite {
  isAlive: boolean = true;
  playground: Playground;
  STEP_LENGTH: number = 630;

  constructor(playground: Playground) {
    super();
    this.playground = playground;

    this.texture = Texture.from("chicken_standing")
    this.width = 276;
    this.height = 382;
    this.position.set(340, 100);
  }

  goOneField(){
    if (this.position.x + this.STEP_LENGTH < this.playground.width) this.position.x += this.STEP_LENGTH
  }
}
