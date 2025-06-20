import {Container, Graphics, Sprite, Text, TextStyle, Texture, Ticker} from "pixi.js";
import {IGame} from "../IGame";
import {BaseGameSession} from "../dtos/BaseGameSession";
import {BaseGameStartSessionRequest} from "../dtos/baseGameStartSessionRequest";
import {BaseGameInteractionRequest} from "../dtos/baseGameInteractionRequest";
import {GameDifficulty} from "../enums/gameDifficulty";
import {Interaction} from "../enums/interaction";
import {GameState} from "../enums/gameState";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../services/user.service";

export class ControlBar extends Container {
  private barHeight: number = 242;

  private game: IGame;
  private userService: UserService
  private gameDifficulty: GameDifficulty = GameDifficulty.NORMAL;
  private investedBalance: Text;
  private currentGains: number = 0;
  private gameSessionId!: string;
  private apiToken: string;

  private isGameInteractionBlocked: boolean = false;

  public betAmountInputIsHovered = false;
  public mainButton: Container<any> | null = null;

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

  private valueStyle2 = new TextStyle({
    fontFamily: 'Arial, sans-serif',
    fontSize: 45,
    fontWeight: 'bold',
    fill: "#fff",
    align: 'center',
  });

  constructor(game: IGame, userService: UserService, apiToken: string) {
    super();
    this.game = game;
    this.userService = userService;
    this.apiToken = apiToken;
    this.position.y = this.game.GAME_HEIGHT-242;
    this.position.x = 0;
    this._zIndex = 9999;

    this.investedBalance = new Text(String(Math.min(this.userService.myBalance, 100)));

    const background = new Graphics()
      .rect(0, 0, this.game.GAME_WIDTH, this.barHeight)
      .fill({ color: 0x181A39 });
    const einsatzSection = this._createEinsatzmengeSection();
    const schwierigkeitSection = this._createSchwierigkeitSection();
    if (this.game.getSupportsMidGamePayout()) {
      const gewinnSection = this._createAktuellerGewinnSection();
      gewinnSection.position.set(schwierigkeitSection.x + schwierigkeitSection.width + 80, this.barHeight / 2 - gewinnSection.height / 2);
      this.addChild(gewinnSection);
    }

    einsatzSection.position.set(50, this.barHeight / 2 - einsatzSection.height / 2);
    schwierigkeitSection.position.set(einsatzSection.x + einsatzSection.width + 80, this.barHeight / 2 - schwierigkeitSection.height / 2);

    this.addChild(background);
    this.addChild(einsatzSection);
    this.addChild(schwierigkeitSection);

    if (this.userService.myBalance > 0) {
      this._createSpielStartenButton();
    }


    Ticker.shared.add(this.currentGainsUpdater, this);
    Ticker.shared.add(this.buttonUpdater, this);
  }

  private currentGainsUpdater(){
    if(isNaN(this.currentGains) || this.currentGains == 0){
      this.currentGainsText.text = "0"
      this.currentGainsText.style = this.valueStyle2;
      return;
    }
    this.currentGainsText.style = this.valueStyle;
    this.currentGainsText.text = "+ " + this.currentGains;
  }

  private buttonUpdater(){
    if (this.game.getGameState() == GameState.ACTIVE){
      if (this.game.getSupportsMidGamePayout() && this.game.getCurrentGains() > 0) {
        this._createGeldAuszahlenButton();
      }
      else {
        if (this.mainButton) {
          this.removeChild(this.mainButton);
          this.mainButton = null;
        }
      }
    }
    else if (this.userService.myBalance > 0 && !(Number(this.investedBalance.text.replace(/\./g, '')) <= 0)){
      this._createSpielStartenButton();
    }
    else {
      if (this.mainButton) {
        this.removeChild(this.mainButton);
        this.mainButton = null;
      }
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

    const betIcon = new Sprite(Texture.from("texture_dialogue_floating_sprite_won"))
    betIcon.height = label.height + 15;
    betIcon.width = label.height +15;
    betIcon.position.set(inputBgRadius, label.height + 15 + (inputBgHeight - betIcon.height) / 2);
    section.addChild(betIcon);

    this.investedBalance.style = this.labelStyle;
    this.investedBalance.anchor.set(0, 0.5);
    this.investedBalance.position.set(
      betIcon.x + betIcon.width + 15,
      label.height + 15 + inputBgHeight / 2
    );

    section.addChild(this.investedBalance);

    inputBackground.eventMode = 'static';
    inputBackground.cursor = 'text';
    inputBackground.on('pointerover', () => {
      this.betAmountInputIsHovered = true;
      if (this.game.getGameState() == GameState.ACTIVE) return;

      inputBackground
        .clear();
      inputBackground
        .roundRect(0, label.height + 15, inputBgWidth, inputBgHeight, inputBgRadius)
        .fill({ color: "#7030A0" });
    });
    inputBackground.on('pointerout', () => {
      this.betAmountInputIsHovered = false;
      if (this.game.getGameState() == GameState.ACTIVE) return;

      inputBackground
        .clear();
      inputBackground
        .roundRect(0, label.height + 15, inputBgWidth, inputBgHeight, inputBgRadius)
        .fill({ color: "#0A0B1F" });
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
        if (this.game.getGameState() == GameState.ACTIVE) return;
        if (this.selectedDifficultyButton) {
          const prevBg = this.selectedDifficultyButton.children[0] as Graphics;
          prevBg.clear().roundRect(0, 0, buttonWidth, buttonHeight, buttonRadius).fill(unselectedColor);
        }
        bg.clear().roundRect(0, 0, buttonWidth, buttonHeight, buttonRadius).fill(selectedColor);
        this.selectedDifficultyButton = button;

        this.gameDifficulty = difficultyValue;
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

  override destroy(options?: boolean): void {
    Ticker.shared.remove(this.currentGainsUpdater, this);
    Ticker.shared.remove(this.buttonUpdater, this);

    for (const button of this.difficultyButtons) {
      button.removeAllListeners();
      button.destroy({ children: true, texture: true });
    }
    this.difficultyButtons = [];

    if (this.mainButton) {
      this.mainButton.removeAllListeners();
      this.mainButton.destroy({ children: true, texture: true });
    }

    this.children.forEach(child => {
      if ((child as any).removeAllListeners) {
        (child as any).removeAllListeners();
      }
      if ((child as any).destroy) {
        (child as any).destroy({ children: true, texture: true });
      }
    });

    this.removeChildren();

    this.selectedDifficultyButton = null;

    super.destroy(options);
  }

  private _createAktuellerGewinnSection(): Container<any> {
    const section = new Container();

    const label = new Text('Aktueller Gewinn', this.labelStyle);
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

    button.position.set(this.game.GAME_WIDTH - button.width - 50, this.barHeight / 2 - button.height / 2);

    if (this.mainButton) {
      this.removeChild(this.mainButton);
    }

    this.mainButton = button;
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

    button.position.set(this.game.GAME_WIDTH - button.width - 50, this.barHeight / 2 - button.height / 2);

    if (this.mainButton) {
      this.removeChild(this.mainButton);
    }
    this.mainButton = button;
    this.addChild(this.mainButton);
  }

  public editBetAmount(key: string): void {
    let numericText = this.investedBalance.text.replace(/\./g, '');

    switch (true) {
      case key.includes("Backspace"):
        numericText = numericText.slice(0, -1);
        break;
      case key.includes("Digit"):
        if (numericText.length < 10) {
          numericText += key.replace("Digit", "");
        }
        break;
    }

    let numericValue = Number(numericText) || 0;

    if (numericValue > this.userService.myBalance) {
      numericValue = this.userService.myBalance;
    }

    this.investedBalance.text = numericValue.toLocaleString('de-DE');
  }


  public async controller(event: KeyboardEvent) {

    switch (true) {
      case this.betAmountInputIsHovered && this.game.getGameState() != GameState.ACTIVE:
        this.editBetAmount(event.code);
        break;
      default:
        await this.processUserGameAction(event)
        break;
    }

  }

  private async processUserGameAction(event: KeyboardEvent){
    if(!this.isGameInteractionBlocked && this.game.getGameState() == GameState.ACTIVE) {
      this.isGameInteractionBlocked = true;

      let interaction = this.game.getInteractionForPressedKey(event);
      if (interaction == Interaction.NONE) return;
      let gameSession = await this.makeInteractionRequest(interaction)
      await this.game.processInteraction(interaction, gameSession);
      this.currentGains = gameSession.gameState == GameState[GameState.LOST] ? 0 : gameSession.balanceDifference - gameSession.investedBalance;
      this.game.setCurrentGains(this.currentGains);

      this.isGameInteractionBlocked = false;
    }
  }

  private async prepareGameSession(gameSession?: BaseGameSession) {
    if(!gameSession){
      gameSession = await this.startGameSession() as BaseGameSession;
    }

    this.investedBalance.text = String(gameSession.investedBalance.toLocaleString('de-DE'));
    this.gameSessionId = gameSession.id;
    this.game.setGameState(GameState.ACTIVE);

    this.currentGains = gameSession.balanceDifference - gameSession.investedBalance;
    this.game.start(gameSession);

    this.userService.updateSelfBalance().subscribe();
  }

  async findAndStartActiveGameSession(){
    try {
      let response = await fetch(environment.backendApiUrl + "game/session/find-active?gameId=" + this.game.getId(), {
        method: 'GET',
        headers: {
          authorization: "Bearer " + this.apiToken
        }
      });
      let gameSession = await response.json() as BaseGameSession;
      await this.prepareGameSession(gameSession);
    } catch {
      this.game.start();
    }
  }

  async startGameSession(): Promise<BaseGameSession>{
    let startSessionRequest = new BaseGameStartSessionRequest(
      this.game.getId(),
      this.gameDifficulty,
      Number(this.investedBalance.text.replace(/\./g, '') || 0),
    );

    let response = await fetch(environment.backendApiUrl + "game/session/start", {
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
    let gameSession = await this.makeInteractionRequest(Interaction.END);
    this.game.end(gameSession);
  }

  async makeInteractionRequest(interaction: Interaction): Promise<BaseGameSession>{
    let interactionRequest = new BaseGameInteractionRequest(
      this.game.getId(),
      this.gameSessionId,
      interaction
    );

    let response = await fetch(environment.backendApiUrl + "game/session/action", {
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
