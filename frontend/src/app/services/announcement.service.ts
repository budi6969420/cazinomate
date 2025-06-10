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
    if (this.gameService.gameMetadatas == null || this.gameService.gameMetadatas.length === 0) {
      this.gameService.dataLoaded$.subscribe(
        data => {
          this.createAnnouncements(data);
        }
      );
    }
    else {
      this.createAnnouncements(this.gameService.gameMetadatas);
    }
  }

  public getAnnouncements(): AnnouncementModel[] {
     return this.announcements;
  }

  private createAnnouncements(games: GameMetadata[]){
    const shuffledGames = [...games].sort(() => 0.5 - Math.random()); // create a shuffled copy
    const selectedGames = shuffledGames.slice(0, 2)

    this.createAnnouncementForGame(selectedGames[0]);
    this.announcements.push({navigationUrl: "/shop", title: "Shop", description: "Kaufen sie unsere tollen Pakete", buttonText: "Jetzt Kaufen", imageUrl: "/images/mrCrabs.svg", isSpecial: true, deactivateButton: false});
    this.createAnnouncementForGame(selectedGames[1]);
  }

  private createAnnouncementForGame(game: GameMetadata){
    let announcement: AnnouncementModel = new AnnouncementModel();

    announcement.title = game.title;
    announcement.description = game.playable ? "Empfohlen auf CazinoMate" : "Bald auf CazinoMate";
    announcement.imageUrl = game.previewImageUrl;
    announcement.buttonText = "Jetzt Spielen";
    announcement.navigationUrl = "/game/" + game.id;
    announcement.isSpecial = false;
    announcement.deactivateButton = !game.playable;

    this.announcements.push(announcement);
  }
}
