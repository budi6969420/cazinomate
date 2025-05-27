import {Container} from "pixi.js";
import {CoinFieldBase} from "./coinFieldBase";
import {CoinFieldDeath} from "./coinFieldDeath";
import {CoinFieldVisited} from "./coinFieldVisited";
import {CoinFieldDefault} from "./coinFieldDefault";
import {CrossyRoadGameVariables} from "../crossyRoadGameVariables";

export class CoinField extends Container {
  private text: string;
  private coinField!: CoinFieldBase;

  constructor(text: string) {
    super();
    this.text = text;

    this.position.x = (CrossyRoadGameVariables.ROAD_TRACK_WIDTH - this.width) / 4;
    this.position.y = (CrossyRoadGameVariables.CHICKEN_PADDING_TOP) + 180;

    this.setToDefault();
    this.addChild(this.coinField);
  }

  setToDeath(){
    this.removeChild(this.coinField);
    this.coinField = new CoinFieldDeath(this.text);
    this.addChild(this.coinField);
  }

  setToVisited(){
    this.removeChild(this.coinField);
    this.coinField = new CoinFieldVisited(this.text);
    this.addChild(this.coinField);
  }

  setToDefault(){
    this.removeChild(this.coinField);
    this.coinField = new CoinFieldDefault(this.text);
    this.addChild(this.coinField);
  }
}
