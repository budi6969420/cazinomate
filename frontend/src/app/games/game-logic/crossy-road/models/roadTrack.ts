import {Container, Sprite} from "pixi.js";
import {CrossyRoadGameVariables} from "../crossyRoadGameVariables";
import {Car} from "./car";
import {gsap} from "gsap";

export class RoadTrack extends Container {
  private car: Car;
  private chickenIsPresent: boolean = false;
  private isFreeOfCars: boolean = false;

  private TEXTURE_LEFT: string = "texture_roadtrack_left";
  private TEXTURE_RIGHT: string = "texture_roadtrack_right";

  constructor(texture: boolean = true) {
    super();

    //ADD BACKGROUND
    const streetBackground = Sprite.from(texture ? this.TEXTURE_LEFT : this.TEXTURE_RIGHT);
    streetBackground.position.set(0, 0);
    streetBackground.width = CrossyRoadGameVariables.ROAD_TRACK_WIDTH;
    streetBackground.height = CrossyRoadGameVariables.GAME_SCREEN_HEIGHT;

    this.addChild(streetBackground)

    //ADD CAR
    const car = new Car();
    this.addChild(car);
    this.car = car;

    this.car.drive()
  }

  setIsFreeOfCars(isFreeOfCars: boolean){
    if(!isFreeOfCars) this.car.drive();
    this.isFreeOfCars = isFreeOfCars;
  }


}
