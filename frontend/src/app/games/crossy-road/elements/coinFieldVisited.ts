import {Texture} from "pixi.js";
import {CoinFieldBase} from "./coinFieldBase";

export class CoinFieldVisited extends CoinFieldBase {

  constructor(text: string) {
    super("");
    this.background.texture = Texture.from("texture_coin_field_visited");
  }
}
