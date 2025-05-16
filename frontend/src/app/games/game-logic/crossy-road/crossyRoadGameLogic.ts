import {IGameLogic} from "../iGameLogic";

export class CrossyRoadGameLogic implements IGameLogic{
  name: string = "crossy-road";

  getName(): string {
    return this.name;
  }
}
