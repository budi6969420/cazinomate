import {Container, Graphics, Text, TextStyle, Ticker} from "pixi.js";
import {IGame} from "../IGame";
import {BaseGameSession} from "../dtos/BaseGameSession";
import {BaseGameStartSessionRequest} from "../dtos/baseGameStartSessionRequest";
import {BaseGameInteractionRequest} from "../dtos/baseGameInteractionRequest";
import {GameDifficulty} from "../enums/gameDifficulty";
import {Interaction} from "../enums/interaction";
import {GameState} from "../enums/gameState";
import {environment} from "../../../../environments/environment";

export class ControlBar extends Container {
  private barHeight: number = 242;

  private game: IGame;
  private GAME_DIFFICULTY: GameDifficulty = GameDifficulty.NORMAL;
  private GAME_INVESTED_BALANCE: Text = new Text("100");
  private GAME_CURRENT_GAINS: number = 0;
  private GAME_SESSION_ID!: string;
  private apiToken: string;

  private isGameInteractionBlocked: boolean = false;

  public betAmountInputIsHovered = false;
  public mainButton!: Container<any>;

  public currentGainsText: Text = new Text();
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

  constructor(game: IGame, apiToken: string) {
    super();
    this.game = game;
    this.apiToken = apiToken;
    this.position.y = this.game.GAME_SCREEN_HEIGHT;
    this.position.x = 0;
    this._zIndex = 9999;

    const background = new Graphics()
      .rect(0, 0, this.game.GAME_SCREEN_WIDTH, this.barHeight)
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

    Ticker.shared.add(this.currentGainsUpdater, this);
    Ticker.shared.add(this.buttonUpdater, this);
  }

  private currentGainsUpdater(){
    if(isNaN(this.GAME_CURRENT_GAINS)){
      this.currentGainsText.text = "+ 0"
      return;
    }
    this.currentGainsText.text = "+ " + this.GAME_CURRENT_GAINS;
  }

  private buttonUpdater(){
    if (this.game.GAME_STATE == GameState.ACTIVE){
      this._createGeldAuszahlenButton();
    }
    else{
      this._createSpielStartenButton();
    }
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

    this.GAME_INVESTED_BALANCE.style = this.labelStyle;
    this.GAME_INVESTED_BALANCE.anchor.set(0, 0.5);
    this.GAME_INVESTED_BALANCE.position.set(
      betIcon.x + betIcon.width + 15,
      label.height + 15 + inputBgHeight / 2
    );

    section.addChild(this.GAME_INVESTED_BALANCE);

    inputBackground.eventMode = 'static';
    inputBackground.cursor = 'text';
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

    const label = new Text('Schwierigkeit 🎲', this.labelStyle);
    section.addChild(label);

    const buttonsContainer = new Container();
    buttonsContainer.position.y = label.height + 15;

    const difficultiesToDisplay = [
      GameDifficulty.EASY,
      GameDifficulty.NORMAL,
      GameDifficulty.HARD,
    ];

    const buttonWidth = 220;
    const buttonHeight = 100;
    const buttonRadius = 20;
    const unselectedColor = 0x2C2C54;
    const selectedColor = 0x7030A0;
    const spacing = 10;

    const selectedByDefault = GameDifficulty.NORMAL;

    difficultiesToDisplay.forEach((difficultyValue, index) => {
      let buttonLabelText: string = GameDifficulty[difficultyValue];

      if(buttonLabelText == "EASY") buttonLabelText = "Einfach";
      if(buttonLabelText == "NORMAL") buttonLabelText = "Mittel";
      if(buttonLabelText == "HARD") buttonLabelText = "Schwer";

      const button = new Container();
      button.name = buttonLabelText;

      button.position.x = difficultyValue * (buttonWidth + spacing);

      const bg = new Graphics()
        .roundRect(0, 0, buttonWidth, buttonHeight, buttonRadius)
        .fill(difficultyValue === selectedByDefault ? selectedColor : unselectedColor);
      button.addChild(bg);

      const text = new Text(buttonLabelText, this.buttonTextStyle);
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

        this.GAME_DIFFICULTY = difficultyValue;
      });

      buttonsContainer.addChild(button);
      this.difficultyButtons.push(button);

      if (difficultyValue === selectedByDefault) {
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

    this.currentGainsText = new Text('0', this.valueStyle);
    this.currentGainsText.anchor.set(0, 0.5);
    this.currentGainsText.position.set(30, label.height + 15 + displayBgHeight / 2);
    section.addChild(this.currentGainsText);

    return section;
  }

  private _createGeldAuszahlenButton(): void {
    if(this.mainButton && this.mainButton.name == "GeldAuszahlen") return;
    const button = new Container();
    button.name = "GeldAuszahlen";
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
      this.endGameSessionPrematurely();
    });

    button.on('pointerover', () => {
      bg.tint = 0xFF7777;
    });
    button.on('pointerout', () => {
      bg.tint = 0xFFFFFF;
    });

    button.position.set(this.game.GAME_SCREEN_WIDTH - button.width - 50, this.barHeight / 2 - button.height / 2);

    this.mainButton = button;
    this.removeChild(this.mainButton);
    this.addChild(this.mainButton);
  }

  public _createSpielStartenButton(): void {
    if(this.mainButton && this.mainButton.name == "SpielStarten") return;

    const button = new Container();
    button.name = "SpielStarten";
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
      this.prepareGameSession();
    });

    button.on('pointerover', () => {
      bg.tint = 0xFF7777;
    });
    button.on('pointerout', () => {
      bg.tint = 0xFFFFFF;
    });

    button.position.set(this.game.GAME_SCREEN_WIDTH - button.width - 50, this.barHeight / 2 - button.height / 2);

    this.mainButton = button;
    this.removeChild(this.mainButton);
    this.addChild(this.mainButton);
  }

  public editBetAmount(key: string): void {

    switch(true){
      case key.includes("Backspace"):
        this.GAME_INVESTED_BALANCE.text = this.GAME_INVESTED_BALANCE.text.substring(0, this.GAME_INVESTED_BALANCE.text.length-1);
        break;
      case key.includes("Digit"):
        if(this.GAME_INVESTED_BALANCE.text.length < 10){
          this.GAME_INVESTED_BALANCE.text = String(this.GAME_INVESTED_BALANCE.text) + String(key.replace("Digit", ""));
        }
    }
  }

  public async controller(event: KeyboardEvent) {

    switch (true) {
      case this.betAmountInputIsHovered && this.game.GAME_STATE != GameState.ACTIVE:
        this.editBetAmount(event.code);
        break;
      default:
        this.processUserGameAction(event)
        break;
    }

  }

  private async processUserGameAction(event: KeyboardEvent){
    if(!this.isGameInteractionBlocked && this.game.GAME_STATE == GameState.ACTIVE) {
      this.isGameInteractionBlocked = true;

      let interaction = this.game.getInteractionForPressedKey(event);
      let gameSession = await this.makeInteractionRequest(interaction)
      await this.game.processInteraction(interaction, gameSession);
      this.GAME_CURRENT_GAINS = gameSession.gameState == GameState[GameState.LOST] ? 0 : gameSession.balanceDifference - gameSession.investedBalance;
      this.game.GAME_CURRENT_GAINS = this.GAME_CURRENT_GAINS;

      this.isGameInteractionBlocked = false;
    }
  }

  private async prepareGameSession(gameSession?: BaseGameSession) {
    if(!gameSession){
      gameSession = await this.startGameSession() as BaseGameSession;
    }

    this.GAME_INVESTED_BALANCE.text = gameSession.investedBalance;
    this.GAME_SESSION_ID = gameSession.id;
    this.game.GAME_STATE = GameState.ACTIVE;

    this.GAME_CURRENT_GAINS = gameSession.balanceDifference - gameSession.investedBalance;
    this.game.start(gameSession);
  }

  async findAndStartActiveGameSession(){
    try {
      let response = await fetch(environment.backendApiUrl + "api/game/session/find-active?gameId=" + this.game.GAME_ID, {
        method: 'GET',
        headers: {
          authorization: "Bearer " + this.apiToken
        }
      });
      let gameSession = await response.json() as BaseGameSession;
      this.prepareGameSession(gameSession);
    } catch {
      this.game.start();
    }
  }

  async startGameSession(): Promise<BaseGameSession>{
    let startSessionRequest = new BaseGameStartSessionRequest(
      this.game.getId(),
      this.GAME_DIFFICULTY,
      Number(this.GAME_INVESTED_BALANCE.text)
    );

    let response = await fetch(environment.backendApiUrl + "api/game/session/start", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: "Bearer " + this.apiToken
      },
      body: JSON.stringify(startSessionRequest)
    });
    return await response.json() as BaseGameSession;
  }

  async endGameSessionPrematurely(){
    await this.makeInteractionRequest(Interaction.END);
    this.game.GAME_STATE = GameState.WON
  }

  async makeInteractionRequest(interaction: Interaction): Promise<BaseGameSession>{
    let interactionRequest = new BaseGameInteractionRequest(
      this.game.GAME_ID,
      this.GAME_SESSION_ID,
      interaction
    );

    let response = await fetch(environment.backendApiUrl + "api/game/session/action", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: "Bearer " + this.apiToken
      },
      body: JSON.stringify(interactionRequest)
    });

    return await response.json();
  }
}
