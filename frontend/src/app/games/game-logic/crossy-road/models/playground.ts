import {Container, Sprite} from "pixi.js";
import {Road} from "./road";
import {Chicken} from "./chicken";
import {CrossyRoadGameVariables} from "../crossyRoadGameVariables";
import {gsap} from "gsap";

export class Playground extends Container<any> {
  chicken: Chicken;
  isScrolling: boolean = false;
  maxScrollX!: number;

  constructor() {
    super();

    const startBackground = Sprite.from("background_start");
    startBackground.width = 824;
    startBackground.height = CrossyRoadGameVariables.GAME_SCREEN_HEIGHT;
    startBackground.position.set(0, 0);
    this.addChild(startBackground);

    let road = new Road();
    road.position.set(startBackground.width, 0);
    this.addChild(road);

    const finishBackground = Sprite.from("background_finish");
    finishBackground.width = 824;
    finishBackground.height = CrossyRoadGameVariables.GAME_SCREEN_HEIGHT;
    finishBackground.position.set(startBackground.width + road.width, 0);
    this.addChild(finishBackground);

    this.chicken = new Chicken(this);
    this.addChild(this.chicken);
  }

  alignView() {
    let chickenPosition = this.chicken.position.x*-1 ;
    let newPosition = this.maxScrollX

    if(chickenPosition > this.maxScrollX) {
      newPosition = chickenPosition + CrossyRoadGameVariables.CHICKEN_PADDING_LEFT
    }

    gsap.to(this.position, {
      x: newPosition,
      duration: 2,
      ease: "power5.out",
      onStart: () => {
        this.isScrolling = true;
      },
      onComplete: () => {
        this.isScrolling = false;
      }
    });
  }

  setMaxScrollX(GAME_WIDTH: number) {
    this.maxScrollX = (this.width * -1) + GAME_WIDTH;
  }
}
