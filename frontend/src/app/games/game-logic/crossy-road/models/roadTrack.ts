import {Container, Sprite, Ticker} from "pixi.js";
import {CrossyRoadGameVariables} from "../crossyRoadGameVariables";
import {Car} from "./car";
import {gsap} from "gsap";

export class RoadTrack extends Container {
  public car: Car;
  public isBlocked: boolean = false;
  public isPaused: boolean = false;

  private TEXTURE_LEFT: string = "texture_roadtrack_left";
  private TEXTURE_RIGHT: string = "texture_roadtrack_right";

  constructor(texture: boolean = true) {
    super();

    const streetBackground = Sprite.from(texture ? this.TEXTURE_LEFT : this.TEXTURE_RIGHT);
    streetBackground.position.set(0, 0);
    streetBackground.width = CrossyRoadGameVariables.ROAD_TRACK_WIDTH;
    streetBackground.height = CrossyRoadGameVariables.GAME_SCREEN_HEIGHT;

    this.addChild(streetBackground)

    const car = new Car();
    this.addChild(car);
    this.car = car;

    this.isPaused = this.randomBiasedBoolean();

    Ticker.shared.add(this.driveLoop, this);
    this.randomlySetIsPausedOnRandomInterval();
  }

  private randomlySetIsPausedOnRandomInterval(){
    let time = 1 + Math.floor(Math.random() * 3) * 1000;

    setInterval(() => {
      this.setIsPaused(this.randomBiasedBoolean());
    }, time);
  }

  private randomBiasedBoolean() {
    return Math.random() < 0.8;
  }
  private driveLoop(): void {
    if (this.isBlocked) return;
    if (this.isPaused) return;
    if (this.car.isDriving) return;

    this.car.drive();
  }

  public setIsBlocked(isBlocked: boolean): void {
    this.isBlocked = isBlocked;
  }

  public getIsBlocked(): boolean {
    return this.isBlocked;
  }

  public setIsPaused(isPaused: boolean): void {
    this.isPaused = isPaused;
  }

  public getIsPaused(): boolean {
    return this.isPaused;
  }

}
