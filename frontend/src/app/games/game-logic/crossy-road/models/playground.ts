import {Container, Sprite, Ticker} from "pixi.js";
import {Road} from "./road";
import {Chicken} from "./chicken";
import {CrossyRoadGameVariables} from "../crossyRoadGameVariables";
import {gsap} from "gsap";

export class Playground extends Container<any> {
  chicken: Chicken;
  road: Road;
  isScrolling: boolean = false;
  maxScrollX!: number;

  private activeWaitForRoadTrackFn: (() => void) | null = null;

  constructor() {
    super();

    const startBackground = Sprite.from("texture_background_start");
    startBackground.width = 824;
    startBackground.height = CrossyRoadGameVariables.GAME_SCREEN_HEIGHT;
    startBackground.position.set(0, 0);
    this.addChild(startBackground);

    let road = new Road();
    road.position.set(startBackground.width, 0);
    this.addChild(road);
    this.road = road;

    const finishBackground = Sprite.from("texture_background_finish");
    finishBackground.width = 824;
    finishBackground.height = CrossyRoadGameVariables.GAME_SCREEN_HEIGHT;
    finishBackground.position.set(startBackground.width + road.width, 0);
    this.addChild(finishBackground);

    this.chicken = new Chicken(this);
    this.addChild(this.chicken);
  }

  moveChicken(){
    if (this.isScrolling || !this.chicken.getIsEffectivelyAlive()) return;

    const currentRoadTrackIndex = this.chicken.roadTrackIndex;
    const currentRoadTrack = this.road.getTrack(currentRoadTrackIndex);
    const nextRoadTrack = this.road.getTrack(currentRoadTrackIndex + 1);

    if (!nextRoadTrack) {
      this.chicken.walk();
      this.alignView();
      return;
    }

    nextRoadTrack.setIsBlocked(true);

    const waitForRoadTrackToBeEmpty = () => {

      if(!nextRoadTrack.car.isDriving && nextRoadTrack.getIsBlocked()){
        Ticker.shared.remove(waitForRoadTrackToBeEmpty, this);
        this.activeWaitForRoadTrackFn = null;

        this.chicken.walk();
        this.alignView();
        currentRoadTrack.setIsBlocked(false);
      }
    }

    this.activeWaitForRoadTrackFn = waitForRoadTrackToBeEmpty;
    Ticker.shared.add(this.activeWaitForRoadTrackFn, this);
  }

  alignView() {
    let chickenPosition = this.chicken.position.x * -1 ;
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
