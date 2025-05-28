import {Injectable} from '@angular/core';
import {AnnouncementModel} from "../models/announcementModel";
import {GameMetadataService} from "./game-metadata.service";
import {GameMetadata} from "../models/gameMetadata";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService{

  private announcements: AnnouncementModel[] = [];

  constructor(private gameService: GameMetadataService) {
    this.gameService.dataLoaded$.subscribe(
      data => {
        this.createAnnouncements(data);
      }
    );
  }

  public getAnnouncements(): AnnouncementModel[] {
     return this.announcements;
  }

  private createAnnouncements(games: GameMetadata[]){
    for (let metadata of games) {

      let announcement: AnnouncementModel = new AnnouncementModel();

      announcement.title = metadata.title;
      announcement.description = "Empfohlen auf CazinoMate";
      announcement.imageUrl = metadata.previewImageUrl;
      announcement.buttonText = "Jetzt Spielen";
      announcement.navigationUrl = "/game/" + metadata.id;
      announcement.isGreen = false;

      this.announcements.push(announcement);
    }

    this.announcements.push({navigationUrl: "/shop", title: "Shop", description: "Kaufen sie unsere tollen Pakete", buttonText: "Jetzt Kaufen", imageUrl: "/images/mrCrabs.svg", isGreen: true});
  }
}
