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

  actionTrigger(){
    if (this.isScrolling) return;
    if (!this.chicken.getIsEffectivelyAlive()) return;
    if (this.activeWaitForRoadTrackFn != null) return;

    const currentRoadTrackIndex = this.chicken.roadTrackIndex;
    const currentRoadTrack = this.road.getTrack(currentRoadTrackIndex);
    const nextRoadTrack = this.road.getTrack(currentRoadTrackIndex + 1);

    if (!nextRoadTrack) {
      this.chicken.walkToFinishLine();
      this.alignView();
      currentRoadTrack.setToVisited();
      return;
    }

    let chickenIsGoingToDie = Math.random() < 0.1;
    nextRoadTrack.setChickenIsSafe(!chickenIsGoingToDie);
    nextRoadTrack.setIsBlocked(true);

    const waitForRoadTrackToBeEmpty = async () => {

      if (!nextRoadTrack.getIsCarDriving() && nextRoadTrack.getIsBlocked()) {
        Ticker.shared.remove(waitForRoadTrackToBeEmpty, this);
        this.activeWaitForRoadTrackFn = null;

        if(this.chicken.isAboutToDie) return;
        this.chicken.walk();
        this.alignView();
        currentRoadTrack.setToVisited();

        if (chickenIsGoingToDie) {
          this.chicken.isAboutToDie = chickenIsGoingToDie;
          await nextRoadTrack.killChicken();
          this.chicken.die();
        }
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
      duration: 1.5,
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
