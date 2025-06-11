import {Container, Sprite, Text, TextStyle, Texture} from "pixi.js";
import {gsap} from "gsap";
import {GameConstants} from "../../gameConstants";

export class EndDialogue extends Container{
  background: Sprite;
  floatingSprites: Sprite[] = [];
  textHeadline: Text = new Text();
  textAmount: Text = new Text();

  AMOUNT_OF_FLOATING_SPRITES = 30;

  constructor() {
    super();

    this._zIndex = 10;
    this.visible = false;

    this.background = new Sprite();
    this.background.height = GameConstants.GAME_SCREEN_HEIGHT;
    this.background.width = GameConstants.GAME_SCREEN_WIDTH;

    this.addChild(this.background);
    this.generateAndPositionFloatingSprites();
    this.addChild(this.textHeadline);
    this.addChild(this.textAmount);
  }

  private generateAndPositionFloatingSprites(){
    let xPosition = 0;

    for(let i=0; i < this.AMOUNT_OF_FLOATING_SPRITES; i++){
      let floatingSprite = new Sprite();
      floatingSprite.height = 307;
      floatingSprite.width = 307;
      floatingSprite.anchor = 0.5;

      if(xPosition > this.background.width*1.5) xPosition = 0;
      xPosition += floatingSprite.width + Math.floor(Math.random() * 50);

      floatingSprite.position.y = floatingSprite.height *-1;
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

  public showPlayerLost(){
    this.background.texture = Texture.from("texture_background_dialogue_game_lost")

    for(let i=0; i<this.floatingSprites.length; i++){
      this.floatingSprites[i].texture = Texture.from("texture_dialogue_floating_sprite_lost")
    }

    let textHeadlineStyle: TextStyle = new TextStyle({
      fontFamily: 'Arial',
      fill: '#ffffff',
      fontSize: 225,
      fontWeight: 'bold',
      stroke: "#391819",
      //@ts-ignore
      strokeThickness: 40
    });

    let textAmountStyle: TextStyle = new TextStyle({
      fontFamily: 'Arial',
      fill: '#ffffff',
      fontSize: 400,
      fontWeight: 'bold',
      stroke: "#391819",
      //@ts-ignore
      strokeThickness: 60
    });

    this.textHeadline.text = "Wrong Side, Champ."
    this.textHeadline.style = textHeadlineStyle;
    this.textHeadline.anchor = 0.5
    this.textHeadline.position.x = GameConstants.GAME_SCREEN_WIDTH / 2;
    this.textHeadline.position.y = GameConstants.GAME_SCREEN_HEIGHT / 2;

    this.textAmount.text = String();
    this.textAmount.style = textAmountStyle;
    this.textAmount.anchor = 0.5
    this.textAmount.position.x = GameConstants.GAME_SCREEN_WIDTH / 2;
    this.textAmount.position.y = GameConstants.GAME_SCREEN_HEIGHT / 1.5;

    this.visible = true;
  }

  public showPlayerWon(finalGains: number){
    this.background.texture = Texture.from("texture_background_dialogue_game_won")

    for(let i=0; i<this.floatingSprites.length; i++){
      this.floatingSprites[i].texture = Texture.from("texture_dialogue_floating_sprite_won")
    }

    let textHeadlineStyle: TextStyle = new TextStyle({
      fontFamily: 'Arial',
      fill: '#ffffff',
      fontSize: 225,
      fontWeight: 'bold',
      stroke: "#171a39",
      //@ts-ignore
      strokeThickness: 5
    });

    let textAmountStyle: TextStyle = new TextStyle({
      fontFamily: 'Arial',
      fill: '#ffffff',
      fontSize: 400,
      fontWeight: 'bold',
      stroke: "#171a39",
      //@ts-ignore
      strokeThickness: 5
    });

    this.textHeadline.text = "Heads Up,\nYou Win!"
    this.textHeadline.style = textHeadlineStyle;
    this.textHeadline.anchor = 0.5
    this.textHeadline.position.x = GameConstants.GAME_SCREEN_WIDTH / 2;
    this.textHeadline.position.y = GameConstants.GAME_SCREEN_HEIGHT / 3;

    this.textAmount.text = String(finalGains.toLocaleString('de-DE'));
    this.textAmount.style = textAmountStyle;
    this.textAmount.anchor = 0.5
    this.textAmount.position.x = GameConstants.GAME_SCREEN_WIDTH / 2;
    this.textAmount.position.y = GameConstants.GAME_SCREEN_HEIGHT / 1.5;

    this.visible = true;
  }

  public hide(){
    this.visible = false;
  }

  public setTextAmount(amount: number){
    console.log(amount)
    this.textAmount.text = isNaN(amount) ? 0 : amount;
    this.textAmount.position.y = GameConstants.GAME_SCREEN_HEIGHT / 1.5;
  }
}
