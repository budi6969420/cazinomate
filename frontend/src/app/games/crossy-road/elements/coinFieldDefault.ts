import {Texture} from "pixi.js";
import {CoinFieldBase} from "./coinFieldBase";

export class CoinFieldDefault extends CoinFieldBase {

  constructor(text: string) {
    super(text);
    this.background.texture = Texture.from("texture_coin_field_default");

    this.text.position.x = (this.width - this.text.width) / 2;
    this.text.position.y = (this.height - this.text.height) / 2;
  }


}
