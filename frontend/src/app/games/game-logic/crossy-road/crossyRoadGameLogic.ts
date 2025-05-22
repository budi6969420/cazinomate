import {IGameLogic} from "../iGameLogic";
import {Container, Ticker} from "pixi.js";
import {Playground} from "./models/playground";
import {CrossyRoadGameVariables, GameState} from "./crossyRoadGameVariables";
import {EndDialogue} from "./models/endDialogue";
import {ControlBar} from "./models/controlBar";
import {CrossyRoadGameStartSessionRequest} from "./crossyRoadGameStartSessionRequest";
import {CrossyRoadGameSession} from "./crossyRoadGameSession";

export class CrossyRoadGameLogic implements IGameLogic{
  name: string = "crossy-road";
  gameWasInitialised: boolean = false;
  stage!: Container<any>
  playgroundScreen!: Playground;
  endDialogueScreen!: EndDialogue;
  controlBar!: ControlBar;

  GAME_HEIGHT: number;
  GAME_WIDTH: number;

  constructor(GAME_HEIGHT: number,GAME_WIDTH: number) {
    this.GAME_HEIGHT = GAME_HEIGHT;
    this.GAME_WIDTH = GAME_WIDTH;

    window.addEventListener('keydown', (event: KeyboardEvent) => {
      this.controller(event);
    });
  }

  start(){
    if (this.playgroundScreen){
      this.stage.removeChild(this.playgroundScreen);
      this.stage.removeChild(this.endDialogueScreen);
      this.stage.removeChild(this.controlBar);

      this.playgroundScreen.destroy();
    }

    this.playgroundScreen = new Playground(this.GAME_WIDTH);

    if(!this.gameWasInitialised){
      this.endDialogueScreen = new EndDialogue();
      this.controlBar = new ControlBar();

      Ticker.shared.add(this.gameStateCheckingLoop, this);
      this.gameWasInitialised = true;
    }

    this.stage.addChild(this.playgroundScreen);
    this.stage.addChild(this.endDialogueScreen);
    this.stage.addChild(this.controlBar);
  }

  private gameStateCheckingLoop(){
    switch(CrossyRoadGameVariables.GAME_STATE){
      case GameState.TO_BE_PREPARED:
        this.prepareGameSession();
        break;
      case GameState.LOST:
        this.endDialogueScreen.showPlayerLost()
        break;
      case GameState.WON:
        this.endDialogueScreen.showPlayerWon()
        break;
      case GameState.ACTIVE:
        this.endDialogueScreen.hide();
    }
  }

  controller(eventOrCommand: KeyboardEvent | string): void {
    let commandCode: string;
    typeof eventOrCommand === 'string' ? commandCode = eventOrCommand : commandCode = eventOrCommand.code;

    switch (true) {
      case CrossyRoadGameVariables.GAME_STATE == GameState.PREPARING:
        break;
      case this.controlBar.betAmountInputIsHovered && CrossyRoadGameVariables.GAME_STATE != GameState.ACTIVE:
        this.controlBar.editBetAmount(commandCode);
        break;
      case commandCode === CrossyRoadGameVariables.COMMAND_MOVE_CHICKEN_FORWARD:
        this.playgroundScreen.actionTrigger();
        break;
      default:
        break;
    }
  }

  private async prepareGameSession() {
    CrossyRoadGameVariables.GAME_STATE = GameState.PREPARING;

    let startSessionRequest = new CrossyRoadGameStartSessionRequest(
      "39c63177-b7ad-478b-a009-69b8fa043e6f",
      CrossyRoadGameVariables.GAME_SETTING_DIFFICULTY,
      Number(this.controlBar.betAmountText.text)
    );

    let response = await fetch("http://localhost:8080/api/game/session/start", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: "Bearer " + CrossyRoadGameVariables.API_TOKEN
      },
      body: JSON.stringify(startSessionRequest)
    });

    const gameSession: CrossyRoadGameSession = await response.json() as CrossyRoadGameSession;

    this.controlBar.betAmountText.text = gameSession.investedBalance;
    CrossyRoadGameVariables.GAME_SESSION_ID = gameSession.id;
    CrossyRoadGameVariables.GAME_STATE = GameState.ACTIVE;
    CrossyRoadGameVariables.GAME_SETTING_ROAD_TRACK_AMOUNT = gameSession.prizeIndexValues.length+1;
    CrossyRoadGameVariables.GAME_SETTING_INITIAL_CHICKEN_INDEX = gameSession.currentIndex;
    this.start();
  }

  getName(): string {
    return this.name;
  }

  setStage(stage: Container<any>){
    this.stage = stage;
  }
}
