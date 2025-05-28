import {Container, Sprite, TextStyle, Text} from "pixi.js";

export class CoinFieldBase extends Container {
  background: Sprite;
  text: Text;
  textStyle: TextStyle = new TextStyle({
    fontFamily: 'Arial',
    fill: '#ffffff',
    fontSize: 50,
    fontWeight: 'bold',
  });

  constructor(textString: string) {
    super();
    this.background = new Sprite();
    this.background.height = 307;
    this.background.width = 307;
    this.addChild(this.background);

    this.height = this.background.height;
    this.width = this.background.width;

    this.text = new Text({
      text: textString,
      style: this.textStyle,
    });
    this.addChild(this.text);

    this.pivot.set(this.width/2, this.height/2);
    this.x = this.width/2;
    this.y = this.height/2;
  }
}
