import {Container, Sprite, Texture} from "pixi.js";
import {CrossyRoadGameVariables} from "../crossyRoadGameVariables";
import {gsap} from "gsap";

export class EndDialogue extends Container{
  background: Sprite;
  floatingSprites: Sprite[] = [];

  AMOUNT_OF_FLOATING_SPRITES = 30;

  constructor(playerHasWon: boolean) {
    super();

    this.background = new Sprite();
    this.background.height = CrossyRoadGameVariables.GAME_SCREEN_HEIGHT;
    this.background.width = CrossyRoadGameVariables.GAME_SCREEN_WIDTH;
    this.addChild(this.background);

    this.generateAndPositionFloatingSprites();
    playerHasWon ? this.setPlayerWon() : this.setPlayerLost();
  }

  generateAndPositionFloatingSprites(){
    let xPosition = 0;

    for(let i=0; i < this.AMOUNT_OF_FLOATING_SPRITES; i++){
      let floatingSprite = new Sprite();
      floatingSprite.height = 307;
      floatingSprite.width = 307;
      floatingSprite.anchor = 0.5;

      if(xPosition > this.background.width*1.5) xPosition = 0;
      xPosition += floatingSprite.width + Math.floor(Math.random() * 50);

      floatingSprite.position.y = floatingSprite.height *-0.5;
      floatingSprite.position.x = (this.background.width*-0.5) + xPosition;

      gsap.to(floatingSprite, {
        rotation: 360,
        duration: 200 + Math.floor(Math.random() * 150),
        repeat: -1,
        ease: "none"
      })
      gsap.to(floatingSprite.position, {
        y: (this.background.height + floatingSprite.height/2),
        delay: Math.floor(Math.random() * 100)/10,
        duration: (500+Math.floor(Math.random() * 300))/100,
        repeat: -1,
        ease: "none"
      })

      this.addChild(floatingSprite);
      this.floatingSprites.push(floatingSprite);
    }
  }

  setPlayerLost(){
    this.background.texture = Texture.from("texture_background_dialogue_game_lost")

    for(let i=0; i<this.floatingSprites.length; i++){
      this.floatingSprites[i].texture = Texture.from("texture_dialogue_floating_sprite_lost")
    }
  }

  setPlayerWon(){
    this.background.texture = Texture.from("texture_background_dialogue_game_won")

    for(let i=0; i<this.floatingSprites.length; i++){
      this.floatingSprites[i].texture = Texture.from("texture_dialogue_floating_sprite_won")
    }
  }
}
