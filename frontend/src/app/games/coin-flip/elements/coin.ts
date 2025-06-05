import {Sprite, Texture} from "pixi.js";
import {GameState} from "../../base-game/enums/gameState";

export class Coin extends Sprite {
  private state: GameState = GameState.WON

  constructor() {
    super();
    this.texture = Texture.from("texture_coin_side");
    this.height = 23;
    this.width = 143;
    this.anchor = 0.5;
  }

  setHugeDimensions() {
    let newDimension = 592;

    if(this.height != newDimension){
      this.height = newDimension;
      this.width = newDimension;
    }
  }

  setToWon(){
    this.texture = Texture.from("texture_coin_won");
    this.setHugeDimensions();

    this.state = GameState.WON;
  }
  setToLost(){
    this.texture = Texture.from("texture_coin_lost");
    this.setHugeDimensions();

    this.state = GameState.LOST;
  }

  getCoinState(): GameState {
    return this.state;
  }
}
