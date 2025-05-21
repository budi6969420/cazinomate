export enum GameState {
  RUNNING,
  LOST,
  WON,
}

export class CrossyRoadGameVariables {
  public static readonly ROAD_TRACK_AMOUNT: number = 2;
  public static readonly ROAD_TRACK_WIDTH: number = 655;
  public static readonly GAME_SCREEN_HEIGHT: number = 1758;
  public static readonly GAME_SCREEN_WIDTH: number = 2770;
  public static readonly CHICKEN_PADDING_LEFT: number = 340;
  public static readonly CHICKEN_PADDING_TOP: number = 1130;

  public static readonly COMMAND_START_GAME: string = "Enter";
  public static readonly COMMAND_MOVE_CHICKEN_FORWARD: string = "KeyX";

  public static GAME_STATE: GameState = GameState.RUNNING;
  public static CURRENT_GAINS: string = "69.420";
}
