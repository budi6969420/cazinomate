import {Container, Graphics} from "pixi.js";
import {CoinFlipGameSession} from "../dtos/coinFlipGameSession";
import {Hand} from "./hand";
import {IGame} from "../../base-game/IGame";
import {GameConstants} from "../../gameConstants";
import {Coin} from "./coin";
import gsap from "gsap";
import {GameState} from "../../base-game/enums/gameState";

export class Playground extends Container {
  private hand: Hand;
  private game: IGame;
  private coin: Coin;
  private isRunningAnimation: boolean = false;

  constructor(game: IGame) {
    super();
    this.game = game;

    const background = new Graphics()
      .rect(0, 0, GameConstants.GAME_SCREEN_WIDTH, GameConstants.GAME_SCREEN_HEIGHT)
      .fill({ color: "#313131" });
    this.addChild(background);

    this.hand = new Hand();
    this.hand.position.x = GameConstants.GAME_SCREEN_WIDTH - this.hand.width;
    this.hand.position.y = GameConstants.GAME_SCREEN_HEIGHT - this.hand.height - 50;
    this.addChild(this.hand);

    this.coin = new Coin();
    this.coin.position.y = 1196;
    this.coin.position.x = 1316;
    this.addChild(this.coin);
  }

  async flipCoin(gameSession: CoinFlipGameSession) {

    if(this.isRunningAnimation){
      return;
    }
    else{
      this.isRunningAnimation = true;
    }

    this.hand.open();

    await gsap.to(this.coin, {
      y: GameConstants.GAME_SCREEN_HEIGHT * -1,
      rotation: (360 * 2 + 100) * (Math.PI / 180),
      duration: 1,
      onStart: () => {
        gsap.to(this.hand, {
          x: GameConstants.GAME_SCREEN_WIDTH,
          duration: 0.7,
          delay: 0.3,
          ease: "power1.in"
        });
      }
    });

    gameSession.gameState == GameState[GameState.LOST] ? this.coin.setToWon() : this.coin.setToLost();
    this.coin.rotation = 0;

    const moveToCenterTween = gsap.to(this.coin, {
      y: GameConstants.GAME_SCREEN_HEIGHT / 2,
      x: GameConstants.GAME_SCREEN_WIDTH / 2,
      duration: 4,
      ease: "power2.out",
    });

    let flipSegmentDuration = 0.15;
    const slowdownFactor = 0.8;

    const flipTimeline = gsap.timeline({
      repeat: -1,
      onRepeat: function() {
        const currentTimeScale = this['timeScale']();
        const newTimeScale = currentTimeScale * slowdownFactor;
        this['timeScale'](newTimeScale);
        flipSegmentDuration = newTimeScale;
      }
    });

    flipTimeline
      .to(this.coin.scale, {
        x: 0,
        duration: flipSegmentDuration,
        ease: "sine.in",
        onComplete: () => {
          if (this.coin.getCoinState() == GameState.WON) {
            this.coin.setToLost();
          } else {
            this.coin.setToWon();
          }
          this.coin.scale.x = 0;
        }
      })
      .to(this.coin.scale, {
        x: 1,
        duration: flipSegmentDuration,
        ease: "sine.out"
      });

    moveToCenterTween.eventCallback("onComplete", () => {
      flipTimeline.kill();
      gsap.to(this.coin.scale, {
        x: 1,
        duration: 0.75
      });
    });

    await moveToCenterTween;
    setTimeout(() => {
      gameSession.gameState == GameState[GameState.WON] ? this.game.setGameState(GameState.WON) : this.game.setGameState(GameState.LOST)
    }, 1500);
  }

  hideCoin() {
    this.coin.setHidden();
  }
}
