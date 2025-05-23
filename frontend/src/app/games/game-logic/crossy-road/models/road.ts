import {Container, Sprite} from "pixi.js";
import {RoadTrack} from "./roadTrack";
import {CrossyRoadGameVariables} from "../crossyRoadGameVariables";

export class Road extends Container{
  roadTracks: RoadTrack[] = [];

  constructor() {
    super();

    let offset = 0;
    for(let i=0; i<CrossyRoadGameVariables.GAME_SETTING_ROAD_TRACK_AMOUNT; i++){
      let roadTrack = new RoadTrack(i != 0, CrossyRoadGameVariables.GAME_SETTING_PRIZES_PER_FIELD[i]);
      roadTrack.position.set(offset, 0);

      this.addChild(roadTrack);
      this.roadTracks.push(roadTrack);

      offset += roadTrack.width;
    }
  }

  getTrack(index: number){
    return this.roadTracks[index];
  }
}
