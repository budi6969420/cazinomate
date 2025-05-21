import {Container} from "pixi.js";

export interface IGameLogic {
  name: string;
  stage: Container<any>;

  getName(): string;
  setStage(stage: Container<any>): void;
  start(): void;
}
