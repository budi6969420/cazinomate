import {Sprite, Texture} from "pixi.js";

export class Hand extends Sprite {
  constructor() {
    super();
    this.texture = Texture.from("texture_hand_closed");
    this.height = 669;
    this.width = 1621;
  }

  open(){
    this.texture = Texture.from("texture_hand_opened");
  }
}
