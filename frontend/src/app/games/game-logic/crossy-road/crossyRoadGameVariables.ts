export enum GameState {
  INACTIVE,
  TO_BE_PREPARED,
  PREPARING,
  ACTIVE,
  LOST,
  WON,
  ENDING,
}

export enum GameDifficulty {
  EASY,
  NORMAL,
  HARD
}

export class CrossyRoadGameVariables {

  public static readonly GAME_ID: string = "39c63177-b7ad-478b-a009-69b8fa043e6f";
  public static readonly ROAD_TRACK_WIDTH: number = 655;
  public static readonly GAME_SCREEN_HEIGHT: number = 1758;
  public static readonly GAME_SCREEN_WIDTH: number = 2770;
  public static readonly CHICKEN_PADDING_LEFT: number = 340;
  public static readonly CHICKEN_PADDING_TOP: number = 1130;

  public static readonly COMMAND_START_GAME: string = "KeyX";
  public static readonly COMMAND_MOVE_CHICKEN_FORWARD: string = "Enter";
  public static readonly COMMAND_ENTER_DIGITS: string = "Digit";

  public static GAME_STATE: GameState = GameState.INACTIVE;
  public static GAME_SETTING_DIFFICULTY: GameDifficulty = GameDifficulty.NORMAL;
  public static GAME_SETTING_ROAD_TRACK_AMOUNT: number = 2;
  public static GAME_SETTING_INITIAL_CHICKEN_INDEX: number = -1;
  public static GAME_SETTING_PRIZES_PER_FIELD: number[] = [];
  public static CURRENT_GAINS: number = 0;

  public static GAME_SESSION_ID: string
  public static USER_ID: string;

  public static API_TOKEN: string;
}
