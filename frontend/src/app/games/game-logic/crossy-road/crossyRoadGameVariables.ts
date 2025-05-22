export enum GameState {
  INACTIVE,
  TO_BE_PREPARED,
  PREPARING,
  ACTIVE,
  LOST,
  WON,
}

export enum GameDifficulty {
  EASY,
  NORMAL,
  HARD
}

export class CrossyRoadGameVariables {

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
  public static CURRENT_GAINS: string = "69.420";

  public static GAME_SESSION_ID: string
  public static USER_ID: string;

  public static API_TOKEN: string;
}
