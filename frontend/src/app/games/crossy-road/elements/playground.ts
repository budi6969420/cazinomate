import {Container, Sprite, Ticker} from "pixi.js";
import {Road} from "./road";
import {Chicken} from "./chicken";
import {CrossyRoadGameVariables} from "../crossyRoadGameVariables";
import {gsap} from "gsap";
import {CrossyRoadGameSession} from "../dtos/crossyRoadGameSession";
import {IGame} from "../../base-game/IGame";
import {GameState} from "../../base-game/enums/gameState";

export class Playground extends Container<any> {
  game: IGame;
  chicken: Chicken;
  road: Road;
  isScrolling: boolean = false;
  maxScrollX: number;

  activeWaitForRoadTrackFn: (() => void) | null = null;

  constructor(game: IGame) {
    super();

    this.game = game;

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

    this.maxScrollX = (this.width * -1) + game.GAME_WIDTH;

    for(let i=0; i <= CrossyRoadGameVariables.GAME_SETTING_INITIAL_CHICKEN_INDEX; i++){
      this.chicken.walk(true);
      this.alignView();
      this.road.getTrack(i).setChickenIsSafe(true)
      this.road.getTrack(i).setToVisited()
    }
  }

  async nextMove(gameSession: CrossyRoadGameSession): Promise<void> {
    return new Promise(async (resolve) => {
      if (this.game.getGameState() != GameState.ACTIVE) return;
      if (this.isScrolling) return;
      if (!this.chicken.getIsEffectivelyAlive()) return;
      if (this.activeWaitForRoadTrackFn != null) return;

      const currentRoadTrackIndex = this.chicken.roadTrackIndex;
      const currentRoadTrack = this.road.getTrack(currentRoadTrackIndex);
      const nextRoadTrack = this.road.getTrack(currentRoadTrackIndex + 1);

      if (!nextRoadTrack) {
        await this.chicken.walkToFinishLine();
        this.game.setGameState(GameState.WON);
        resolve();
        return;
      }

      let chickenIsGoingToDie = gameSession.gameState == GameState[GameState.LOST];

      nextRoadTrack.setChickenIsSafe(!chickenIsGoingToDie);
      nextRoadTrack.setIsBlocked(true);

      const waitForRoadTrackToBeEmpty = async () => {
        if (!nextRoadTrack.getIsCarDriving() && nextRoadTrack.getIsBlocked()) {
          Ticker.shared.remove(waitForRoadTrackToBeEmpty, this);
          this.activeWaitForRoadTrackFn = null;

          if (this.chicken.chickenIsGoingToDie) return;

          this.chicken.walk();
          chickenIsGoingToDie ? this.alignView() : await this.alignView();

          if (chickenIsGoingToDie) {
            this.chicken.chickenIsGoingToDie = true;
            await nextRoadTrack.killChicken();
            await this.chicken.die();
            this.game.setGameState(GameState.LOST);
          }

          if (currentRoadTrackIndex+1 < this.road.roadTracks.length) {
            nextRoadTrack.setToVisited();
          }
          resolve();
        }
      };

      this.activeWaitForRoadTrackFn = waitForRoadTrackToBeEmpty;
      Ticker.shared.add(this.activeWaitForRoadTrackFn, this);

    });
  }

  async setAllFieldsToVisited(){
    for(let i=0; i < this.road.roadTracks.length; i++){
      this.road.getTrack(i).setToVisited();
    }
  }
  async scrollToDeathField(deathFieldIndex: number){
    let scrollPositionX = CrossyRoadGameVariables.ROAD_TRACK_WIDTH * deathFieldIndex * -1;

    await gsap.to(this.position, {
      x: scrollPositionX,
      duration: 1.5,
      ease: "power5.out",
      onStart: () => {
        this.isScrolling = true;
      },
      onComplete: () => {
        this.isScrolling = false;
      }
    });

    await this.road.getTrack(deathFieldIndex).setToDeath();
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2 * 1000);
    });
  }

  async scrollToMaxWidth(){
    await gsap.to(this.position, {
      x: this.maxScrollX,
      duration: 1,
      ease: "power5.out",
      onStart: () => {
        this.isScrolling = true;
      },
      onComplete: () => {
        this.isScrolling = false;
      }
    });

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1 * 1000);
    });
  }

  async alignView(): Promise<void> {
    let chickenPosition = this.chicken.position.x * -1;
    let newPosition = this.maxScrollX;

    if(chickenPosition > this.maxScrollX) {
      newPosition = chickenPosition + CrossyRoadGameVariables.CHICKEN_PADDING_LEFT
    }

    let duration = 1.5;

    await gsap.to(this.position, {
      x: newPosition,
      duration: duration,
      ease: "power5.out",
      onStart: () => {
        this.isScrolling = true;
      },
      onComplete: () => {
        this.isScrolling = false;
      }
    });
  }
}
