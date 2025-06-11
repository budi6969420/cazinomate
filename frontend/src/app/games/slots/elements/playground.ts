import { Container, Sprite } from "pixi.js";
import { IGame } from "../../base-game/IGame";

export class Playground extends Container<any> {
  game: IGame;

  constructor(game: IGame) {
    super();

    this.game = game;

    const background = Sprite.from("under_construction");
    background.width = game.GAME_WIDTH;
    background.height = game.GAME_HEIGHT;
    background.position.set(0, 0);

    this.addChild(background);
  }
}
