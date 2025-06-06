import {AnimatedSprite, Texture} from "pixi.js";
import {gsap} from "gsap";
import {Playground} from "./playground";
import {CrossyRoadGameVariables} from "../crossyRoadGameVariables";
import {GameState} from "../../base-game/enums/gameState";
import {sound} from "@pixi/sound";

enum ChickenState {
  IDLE,
  WALKING,
  DYING,
  DEAD,
}

export class Chicken extends AnimatedSprite {
  private playground: Playground;

  public currentState: ChickenState;
  public roadTrackIndex: number = -1;
  public chickenIsGoingToDie: boolean = false;

  private idleFrames: Texture[];
  private walkFrames: Texture[];
  private dieFrame: Texture[];
  private deadFrame: Texture[];

  private activeMovementTween?: gsap.core.Tween;

  constructor(playground: Playground) {
    const standTexture = Texture.from("texture_chicken_standing");
    const walkTexture = Texture.from("texture_chicken_walking");
    const dyingTexture = Texture.from("texture_chicken_dying");
    const deadTexture = Texture.from("texture_chicken_dead");

    super([standTexture]);

    this.idleFrames = [standTexture];
    this.walkFrames = [standTexture, walkTexture];
    this.dieFrame = [dyingTexture];
    this.deadFrame = [deadTexture];

    this.playground = playground;

    this.anchor.set(0.5, 1.0);
    this.scale = 1;
    this.width = 276;
    this.height = 382;
    this.position.set(
      CrossyRoadGameVariables.CHICKEN_PADDING_LEFT + this.width * this.anchor.x,
      CrossyRoadGameVariables.CHICKEN_PADDING_TOP + this.height
    );

    this.animationSpeed = 0.1;
    this.loop = true;
    this.currentState = ChickenState.IDLE;
    this.play();
  }

  public getIsEffectivelyAlive(): boolean {
    return (this.currentState !== ChickenState.DEAD && this.currentState !== ChickenState.DYING) && !this.chickenIsGoingToDie;
  }

  public setState(newState: ChickenState): void {
    if (this.currentState === newState) {
      return;
    }

    this.currentState = newState;
    this.loop = false;
    this.onComplete = undefined;

    switch (newState) {
      case ChickenState.IDLE:
        this.textures = this.idleFrames;
        this.animationSpeed = 0.1;
        break;
      case ChickenState.WALKING:
        this.textures = this.walkFrames;
        this.loop = true;
        this.animationSpeed = 0.15;
        break;
      case ChickenState.DYING:
        this.textures = this.dieFrame;
        this.gotoAndPlay(0);
        break;
      case ChickenState.DEAD:
        this.textures = this.deadFrame;
        this.gotoAndStop(0);
        break;
    }

    if (newState === ChickenState.IDLE || newState === ChickenState.WALKING) {
      this.play();
    }
  }

  async walkToFinishLine(): Promise<void> {
    this.activeMovementTween = gsap.to(this.position, {
      x: this.playground.width - CrossyRoadGameVariables.CHICKEN_PADDING_LEFT,
      y: (CrossyRoadGameVariables.GAME_SCREEN_HEIGHT / 3) + this.height,
      duration: 1,
      ease: "power1.out",
      onStart: () => {
        this.setState(ChickenState.WALKING);
      },
      onComplete: () => {
        if (this.currentState === ChickenState.WALKING) this.setState(ChickenState.IDLE);
        if (this.roadTrackIndex+1 <= CrossyRoadGameVariables.GAME_SETTING_ROAD_TRACK_AMOUNT) this.roadTrackIndex++;

        this.activeMovementTween = undefined;
      }
    });

    return await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2 * 1000);
    });
  }

  walk(isQuick: boolean = false) {
    if (!this.getIsEffectivelyAlive() || (this.activeMovementTween && this.activeMovementTween.isActive())) {
      return;
    }

    const currentCenterX = this.position.x;
    const targetCenterX = currentCenterX + CrossyRoadGameVariables.ROAD_TRACK_WIDTH;
    const halfWidth = this.width / 2;
    const rightPlaygroundEdge = this.playground.width;
    const effectiveRightBoundary = rightPlaygroundEdge - (CrossyRoadGameVariables.CHICKEN_PADDING_LEFT || halfWidth);


    if (targetCenterX > effectiveRightBoundary) {
      if (currentCenterX >= effectiveRightBoundary) return;
      return;
    }

    let duration = isQuick ? 0 : 1;
    let afterDelay = 2;

    this.activeMovementTween = gsap.to(this.position, {
      x: targetCenterX,
      duration: duration,
      ease: "power1.out",
      onStart: () => {
        if (!isQuick) {
          this.setState(ChickenState.WALKING);
          sound.play('sound_chicken_walking', {
            volume: 2
          });
        }
      },
      onComplete: () => {
        if (this.currentState === ChickenState.WALKING) {
          this.setState(ChickenState.IDLE);
        }
        if (this.roadTrackIndex + 1 <= CrossyRoadGameVariables.GAME_SETTING_ROAD_TRACK_AMOUNT) {
          this.roadTrackIndex++;
        }
        this.activeMovementTween = undefined;
      }
    });
  }

  async die(): Promise<void> {
    gsap.killTweensOf(this);
    gsap.killTweensOf(this.scale);

    const tl = gsap.timeline();
    const targetScaleUpDying = 1.2;
    const targetScaleUpDead = 1.1;
    const targetScaleDown = 1.0;

    tl
      .from(this.scale, {
        x: targetScaleUpDying,
        y: targetScaleUpDying,
        ease: "power1.out",
        duration: 0.1,
        onStart: () => {
          sound.play('sound_chicken_dying');
          this.setState(ChickenState.DYING);
        }
      })
      .from(this.scale, {
        x: targetScaleUpDead,
        y: targetScaleUpDead,
        duration: 0.0001,
        ease: "power1.out",
        onStart: () => {
          this.setState(ChickenState.DEAD);
        }
      })
      .to(this.scale, {
        x: targetScaleDown,
        y: targetScaleDown,
        duration: 0.25,
        ease: "power1.out"
      })

    return await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1 * 1000);
    });
  }

  resetStateAndPosition() {
    if (this.activeMovementTween && this.activeMovementTween.isActive()) {
      this.activeMovementTween.kill();
      this.activeMovementTween = undefined;
    }
    this.position.set(
      CrossyRoadGameVariables.CHICKEN_PADDING_LEFT + this.width / 2,
      CrossyRoadGameVariables.CHICKEN_PADDING_TOP + this.height / 2
    );
    this.setState(ChickenState.IDLE);
  }
}
