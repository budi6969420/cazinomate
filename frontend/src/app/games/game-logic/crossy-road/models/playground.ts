import {Container, Sprite} from "pixi.js";
import {Street} from "./street";
import {Chicken} from "./chicken";

export class Playground extends Container<any> {
  chicken: Chicken;
  maxScrollX!: number;

  constructor() {
    super();

    const startBackground = Sprite.from("background_start");
    startBackground.width = 824;
    startBackground.height = 1758;
    startBackground.position.set(0, 0);
    this.addChild(startBackground);

    let street = new Street();
    street.position.set(startBackground.width, 0);
    this.addChild(street);

    const finishBackground = Sprite.from("background_finish");
    finishBackground.width = 824;
    finishBackground.height = 1758;
    finishBackground.position.set(startBackground.width + street.width, 0);
    this.addChild(finishBackground);

    this.chicken = new Chicken(this);
    this.addChild(this.chicken);

    const controlDown = (event: KeyboardEvent) => {
      if(event.code !== 'Enter') return;
      this.chicken.goOneField();
      this.centerView()
      //let posX: string | null = prompt("PosX", String(this.chicken.position.x));
      //this.chicken.position.x = Number(posX);
    };
    window.addEventListener('keydown', controlDown);
  }

  centerView() {
    let newPosition = this.chicken.position.x*-1 ;
    newPosition <= this.maxScrollX ? this.position.x = this.maxScrollX : this.position.x = newPosition+340;
  }

  setMaxScrollX(GAME_WIDTH: number) {
    this.maxScrollX = (this.width * -1) + GAME_WIDTH;
  }
}
