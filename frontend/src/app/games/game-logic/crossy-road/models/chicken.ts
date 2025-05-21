import { AnimatedSprite, Texture, Assets } from "pixi.js";
import { gsap } from "gsap";
import { Playground } from "./playground";
import { CrossyRoadGameVariables } from "../crossyRoadGameVariables";

enum ChickenState {
  IDLE,
  WALKING,
  DYING,
  DEAD,
}

export class Chicken extends AnimatedSprite {
  private playground: Playground;

  public currentState: ChickenState;
  public roadTrackIndex = -1;

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
    this.width = 276;
    this.height = 382;
    this.position.set(
      CrossyRoadGameVariables.CHICKEN_PADDING_LEFT + this.width / 2,
      CrossyRoadGameVariables.CHICKEN_PADDING_TOP + this.height
    );

    this.animationSpeed = 0.1;
    this.loop = true;
    this.currentState = ChickenState.IDLE;
    this.play();
  }

  public getIsEffectivelyAlive(): boolean {
    return this.currentState !== ChickenState.DEAD && this.currentState !== ChickenState.DYING;
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

  walk() {
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

    this.activeMovementTween = gsap.to(this.position, {
      x: targetCenterX,
      duration: 1,
      ease: "power1.out",
      onStart: () => {
        this.setState(ChickenState.WALKING);
      },
      onComplete: () => {
        if (this.currentState === ChickenState.WALKING) {
          this.setState(ChickenState.IDLE);
        }
        if(this.roadTrackIndex+1 <= CrossyRoadGameVariables.ROAD_TRACK_AMOUNT) {
          this.roadTrackIndex++;
        }

        this.activeMovementTween = undefined;
      }
    });
  }

  die() {
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
