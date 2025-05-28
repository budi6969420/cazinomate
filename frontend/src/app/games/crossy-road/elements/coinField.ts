import {Container} from "pixi.js";
import {gsap} from "gsap";
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

  async setToDeath(){
    let newCoinField = new CoinFieldDeath(this.text);
    return this.replace(this.coinField, newCoinField);
  }

  async setToVisited(){
    let newCoinField = new CoinFieldVisited(this.text);
    return this.replace(this.coinField, newCoinField);
  }

  async setToDefault(){
    this.removeChild(this.coinField);
    this.coinField = new CoinFieldDefault(this.text);
    this.addChild(this.coinField);
  }

  async replace(oldCoinField: CoinFieldBase, newCoinField: CoinFieldBase){
    this.coinField = newCoinField;

    await gsap.to(oldCoinField, {
      height: oldCoinField.height * 0.5,
      width: oldCoinField.width * 0.5,
      duration: 0.5,
      ease: "power3.in"
    })

    this.removeChild(oldCoinField)
    this.addChild(newCoinField)

    await gsap.from(newCoinField, {
      height: oldCoinField.height * 0.5,
      width: oldCoinField.width * 0.5,
      duration: 0.5,
      ease: "power3.out"
    })
  }

}
