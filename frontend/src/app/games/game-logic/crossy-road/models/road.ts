import {Container, Sprite} from "pixi.js";
import {RoadTrack} from "./roadTrack";
import {CrossyRoadGameVariables} from "../crossyRoadGameVariables";

export class Road extends Container{
  roadTracks: RoadTrack[] = [];

  constructor() {
    super();

    let offset = 0;
    for(let i=0; i<CrossyRoadGameVariables.ROAD_TRACK_AMOUNT; i++){
      let roadTrack = new RoadTrack(i != 0);
      roadTrack.position.set(offset, 0);

      this.addChild(roadTrack);
      this.roadTracks.push(roadTrack);

      offset += roadTrack.width;
    }

  }

}
