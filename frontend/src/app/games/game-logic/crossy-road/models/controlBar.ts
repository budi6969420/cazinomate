import {Container, Graphics, Text, TextStyle} from "pixi.js";
import {CrossyRoadGameVariables, GameState} from "../crossyRoadGameVariables";

export class ControlBar extends Container {
  private barHeight: number = 242;

  public betAmountInputIsHovered = false;
  public mainButton!: Container<any>;
  public betAmountText: Text = new Text("10");
  public currentWinningsText: Text = new Text();
  private difficultyButtons: Container<any>[] = [];
  private selectedDifficultyButton: Container<any> | null = null;

  private buttonTextStyle = new TextStyle({
    fontFamily: 'Arial, sans-serif',
    fontSize: 40,
    fontWeight: 'bold',
    fill: "#ffffff",
    align: 'center',
  });
  private labelStyle = new TextStyle({
    fontFamily: 'Arial, sans-serif',
    fontSize: 40,
    fontWeight: 'bold',
    fill: "#ffffff",
    align: 'left',
  });

  private valueStyle = new TextStyle({
    fontFamily: 'Arial, sans-serif',
    fontSize: 45,
    fontWeight: 'bold',
    fill: "#55C660",
    align: 'center',
  });

  constructor() {
    super();
    this.position.y = CrossyRoadGameVariables.GAME_SCREEN_HEIGHT;
    this.position.x = 0;

    const background = new Graphics()
      .rect(0, 0, CrossyRoadGameVariables.GAME_SCREEN_WIDTH, this.barHeight)
      .fill({ color: 0x181A39 });
    const einsatzSection = this._createEinsatzmengeSection();
    const schwierigkeitSection = this._createSchwierigkeitSection();
    const gewinnSection = this._createAktuellerGewinnSection();

    einsatzSection.position.set(50, this.barHeight / 2 - einsatzSection.height / 2);
    schwierigkeitSection.position.set(einsatzSection.x + einsatzSection.width + 80, this.barHeight / 2 - schwierigkeitSection.height / 2);
    gewinnSection.position.set(schwierigkeitSection.x + schwierigkeitSection.width + 80, this.barHeight / 2 - gewinnSection.height / 2);

    this.addChild(background);
    this.addChild(einsatzSection);
    this.addChild(schwierigkeitSection);
    this.addChild(gewinnSection);

    this._createSpielStartenButton();
  }

  private _createEinsatzmengeSection(): Container<any> {
    const section = new Container();
    const label = new Text('Einsatzmenge 💰', this.labelStyle);
    section.addChild(label);

    const inputBgWidth = 500;
    const inputBgHeight = 100;
    const inputBgRadius = 40;

    const inputBackground = new Graphics()
      .roundRect(0, label.height + 15, inputBgWidth, inputBgHeight, inputBgRadius)
      .fill({ color: "#0A0B1F" });
    section.addChild(inputBackground);

    const betIcon = new Text('🤑', { ...this.valueStyle }); // White icon
    betIcon.position.set(inputBgRadius, label.height + 15 + (inputBgHeight - betIcon.height) / 2);
    section.addChild(betIcon);

    this.betAmountText.style = this.labelStyle;
    this.betAmountText.anchor.set(0, 0.5);
    this.betAmountText.position.set(
      betIcon.x + betIcon.width + 15,
      label.height + 15 + inputBgHeight / 2
    );

    section.addChild(this.betAmountText);

    inputBackground.eventMode = 'static';
    inputBackground.cursor = 'text';
    inputBackground.on('pointertap', () => {
      console.log("Einsatzmenge input area clicked. Implement input handling.");
    });
    inputBackground.on('pointerover', () => {
      this.betAmountInputIsHovered = true;
    });
    inputBackground.on('pointerout', () => {
      this.betAmountInputIsHovered = false;
    });

    return section;
  }

  private _createSchwierigkeitSection(): Container<any> {
    const section = new Container();
    this.difficultyButtons = [];

    const label = new Text('Schwierigkeit 🎲', this.labelStyle);
    section.addChild(label);

    const buttonsContainer = new Container();
    buttonsContainer.position.y = label.height + 15;

    const buttonLabels = ['Einfach', 'Mittel', 'Schwer'];
    const buttonWidth = 220;
    const buttonHeight = 100;
    const buttonRadius = 20;
    const unselectedColor = 0x2C2C54;
    const selectedColor = 0x7030A0;
    const spacing = 10;

    buttonLabels.forEach((btnLabelText, index) => {
      const button = new Container();
      button.name = btnLabelText;
      button.position.x = index * (buttonWidth + spacing);

      const bg = new Graphics()
        .roundRect(0, 0, buttonWidth, buttonHeight, buttonRadius)
        .fill(btnLabelText === 'Mittel' ? selectedColor : unselectedColor);
      button.addChild(bg);

      const text = new Text(btnLabelText, this.buttonTextStyle);
      text.anchor.set(0.5);
      text.position.set(buttonWidth / 2, buttonHeight / 2);
      button.addChild(text);

      button.eventMode = 'static';
      button.cursor = 'pointer';

      button.on('pointertap', () => {
        if (this.selectedDifficultyButton) {
          const prevBg = this.selectedDifficultyButton.children[0] as Graphics;
          prevBg.clear().roundRect(0, 0, buttonWidth, buttonHeight, buttonRadius).fill(unselectedColor);
        }
        bg.clear().roundRect(0, 0, buttonWidth, buttonHeight, buttonRadius).fill(selectedColor);
        this.selectedDifficultyButton = button;
        console.log(`Schwierigkeit: ${btnLabelText}`);
      });

      buttonsContainer.addChild(button);
      this.difficultyButtons.push(button);

      if (btnLabelText === 'Mittel') {
        this.selectedDifficultyButton = button;
      }
    });

    section.addChild(buttonsContainer);
    return section;
  }

  private _createAktuellerGewinnSection(): Container<any> {
    const section = new Container();

    const label = new Text('Aktueller Gewinn €', this.labelStyle);
    section.addChild(label);

    const displayBgWidth = 450;
    const displayBgHeight = 100;
    const displayBgRadius = 40;

    const displayBackground = new Graphics()
      .roundRect(0, label.height + 15, displayBgWidth, displayBgHeight, displayBgRadius)
      .fill({ color: "#0A0B1F" });
    section.addChild(displayBackground);

    this.currentWinningsText = new Text('+4.150 EUR', this.valueStyle);
    this.currentWinningsText.anchor.set(0, 0.5);
    this.currentWinningsText.position.set(30, label.height + 15 + displayBgHeight / 2);
    section.addChild(this.currentWinningsText);

    return section;
  }

  private _createGeldAuszahlenButton(): void {
    const button = new Container();
    const buttonWidth = 700;
    const buttonHeight = 100;
    const buttonRadius = 40;

    const bg = new Graphics()
      .roundRect(0, 0, buttonWidth, buttonHeight, buttonRadius)
      .fill({ color: 0xE53935 });
    button.addChild(bg);

    const text = new Text('Geld Auszahlen', {...this.buttonTextStyle, fontSize: 28});
    text.anchor.set(0.5);
    text.position.set(buttonWidth / 2, buttonHeight / 2);
    button.addChild(text);

    button.eventMode = 'static';
    button.cursor = 'pointer';
    button.on('pointertap', () => {
      this._createSpielStartenButton()
    });

    button.on('pointerover', () => {
      bg.tint = 0xFF7777;
    });
    button.on('pointerout', () => {
      bg.tint = 0xFFFFFF;
    });

    button.position.set(CrossyRoadGameVariables.GAME_SCREEN_WIDTH - button.width - 50, this.barHeight / 2 - button.height / 2);

    this.mainButton = button;
    this.removeChild(this.mainButton);
    this.addChild(this.mainButton);
  }

  private _createSpielStartenButton(): void {
    const button = new Container();
    const buttonWidth = 700;
    const buttonHeight = 100;
    const buttonRadius = 40;

    const bg = new Graphics()
      .roundRect(0, 0, buttonWidth, buttonHeight, buttonRadius)
      .fill({ color: "#EBAF0D" });
    button.addChild(bg);

    const text = new Text('Spiel Starten', {...this.buttonTextStyle, fontSize: 28});
    text.anchor.set(0.5);
    text.position.set(buttonWidth / 2, buttonHeight / 2);
    button.addChild(text);

    button.eventMode = 'static';
    button.cursor = 'pointer';
    button.on('pointertap', () => {
      CrossyRoadGameVariables.GAME_STATE = GameState.TO_BE_PREPARED;
      this._createGeldAuszahlenButton();
    });

    button.on('pointerover', () => {
      bg.tint = 0xFF7777;
    });
    button.on('pointerout', () => {
      bg.tint = 0xFFFFFF;
    });

    button.position.set(CrossyRoadGameVariables.GAME_SCREEN_WIDTH - button.width - 50, this.barHeight / 2 - button.height / 2);

    this.mainButton = button;
    this.removeChild(this.mainButton);
    this.addChild(this.mainButton);
  }

  public editBetAmount(key: string): void {

    switch(true){
      case key.includes("Backspace"):
        this.betAmountText.text = this.betAmountText.text.substring(0, this.betAmountText.text.length-1);
        break;
      case key.includes("Digit"):
        if(this.betAmountText.text.length < 10){
          this.betAmountText.text = String(this.betAmountText.text) + String(key.replace("Digit", ""));
        }
    }
  }

  public setCurrentWinnings(winnings: string): void {
    this.currentWinningsText.text = winnings;
  }

  public getSelectedDifficulty(): string | null {
    return this.selectedDifficultyButton ? this.selectedDifficultyButton.name : null;
  }
}
