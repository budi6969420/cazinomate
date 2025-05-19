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
  public currentState: ChickenState;
  private playground: Playground;
  private activeMovementTween?: gsap.core.Tween;

  private idleFrames: Texture[];
  private walkFrames: Texture[];
  private dieOnceFrames: Texture[];
  private deadFrame: Texture[];

  constructor(playground: Playground) {
    const standTexture = Texture.from("chicken_standing");
    const walkTexture = Texture.from("chicken_walking");
    const dyingTexture = Texture.from("chicken_dying");
    const deadStaticTexture = Texture.from("chicken_dead");

    super([standTexture]);

    this.idleFrames = [standTexture];
    this.walkFrames = [standTexture, walkTexture];
    this.dieOnceFrames = [dyingTexture, deadStaticTexture];
    this.deadFrame = [deadStaticTexture];

    this.playground = playground;
    this.anchor.set(0.5);
    this.width = 276;
    this.height = 382;
    this.position.set(
      CrossyRoadGameVariables.CHICKEN_PADDING_LEFT + this.width / 2,
      CrossyRoadGameVariables.CHICKEN_PADDING_TOP + this.height / 2
    );

    this.animationSpeed = 0.1;
    this.loop = true;
    this.currentState = ChickenState.IDLE;
    this.play();
  }

  public get isEffectivelyAlive(): boolean {
    return this.currentState !== ChickenState.DEAD && this.currentState !== ChickenState.DYING;
  }

  public setState(newState: ChickenState): void {
    if (this.currentState === newState && newState !== ChickenState.DYING) {
      return;
    }

    this.currentState = newState;
    this.loop = true;
    this.onComplete = undefined;

    switch (newState) {
      case ChickenState.IDLE:
        this.textures = this.idleFrames;
        this.animationSpeed = 0.1;
        break;
      case ChickenState.WALKING:
        this.textures = this.walkFrames;
        this.animationSpeed = 0.15;
        break;
      case ChickenState.DYING:
        this.textures = this.dieOnceFrames;
        this.loop = false;
        this.animationSpeed = 0.1;
        this.gotoAndPlay(0);
        this.onComplete = () => {
          this.setState(ChickenState.DEAD);
        };
        break;
      case ChickenState.DEAD:
        this.textures = this.deadFrame;
        this.loop = false;
        this.gotoAndStop(0);
        break;
    }

    if (newState === ChickenState.IDLE || newState === ChickenState.WALKING) {
      this.play();
    }
  }

  moveForward() {
    if (!this.isEffectivelyAlive || (this.activeMovementTween && this.activeMovementTween.isActive())) {
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
        this.activeMovementTween = undefined;
      }
    });
  }

  die() {
    if (!this.isEffectivelyAlive) return;

    if (this.activeMovementTween && this.activeMovementTween.isActive()) {
      this.activeMovementTween.kill();
      this.activeMovementTween = undefined;
    }
    this.setState(ChickenState.DYING);
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
