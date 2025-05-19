import {Container, Sprite} from "pixi.js";

export class Street extends Container{

  constructor() {
    super();

    const streetBackground = Sprite.from("background_street");
    streetBackground.position.set(0, 0);
    streetBackground.width = 7593;
    streetBackground.height = 1758;
    this.addChild(streetBackground);
  }

}
