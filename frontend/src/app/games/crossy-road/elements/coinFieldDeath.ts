import {Texture} from "pixi.js";
import {CoinFieldBase} from "./coinFieldBase";

export class CoinFieldDeath extends CoinFieldBase {

  constructor(text: string) {
    super(text);
    this.background.texture = Texture.from("texture_coin_field_death");

    this.text.position.x = (this.width - this.text.width) / 2;
    this.text.position.y = (this.height - this.text.height) * 0.8;
  }
}
