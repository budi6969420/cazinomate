import {Container, Sprite, Ticker} from "pixi.js";
import {CrossyRoadGameVariables} from "../crossyRoadGameVariables";
import {Car} from "./car";
import {gsap} from "gsap";
import {Brick} from "./brick";
import {CoinField} from "./coinField";

export class RoadTrack extends Container {
  private coinField!: CoinField;
  private car: Car;
  private brick: Brick;
  private isBlocked: boolean = false;
  private isPaused: boolean = false;
  private chickenIsSafe: boolean = false;

  private TEXTURE_LEFT: string = "texture_roadtrack_left";
  private TEXTURE_RIGHT: string = "texture_roadtrack_right";

  constructor(texture: boolean = true, coinValue: number) {
    super();

    const streetBackground = Sprite.from(texture ? this.TEXTURE_LEFT : this.TEXTURE_RIGHT);
    streetBackground.position.set(0, 0);
    streetBackground.width = CrossyRoadGameVariables.ROAD_TRACK_WIDTH;
    streetBackground.height = CrossyRoadGameVariables.GAME_SCREEN_HEIGHT;

    this.addChild(streetBackground)

    if(coinValue){
      const coinField = new CoinField(String(coinValue));
      this.addChild(coinField);
      this.coinField = coinField;
    }

    const car = new Car();
    this.addChild(car);
    this.car = car;

    const brick = new Brick();
    this.addChild(brick);
    this.brick = brick;

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
    if (this.car.isDriving) return;

    if (this.chickenIsSafe) {
      this.brick.fall();
      return;
    }

    if (this.isBlocked) return;
    if (this.isPaused) return;

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

  public getIsCarDriving(): boolean {
    return this.car.isDriving;
  }

  public setChickenIsSafe(chickenIsSafe: boolean){
    this.chickenIsSafe = chickenIsSafe;
  }

  public killChicken(){
    return this.car.killChicken();
  }

  public setToVisited(){
    this.coinField.setToVisited();
    this.setIsBlocked(false);
  }
}
