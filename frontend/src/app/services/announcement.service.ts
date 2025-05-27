import { Injectable } from '@angular/core';
import {AnnouncementModel} from "../models/announcementModel";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private announcements: AnnouncementModel[] = [];

  constructor() {
    this.announcements = [{navigationUrl: "/game/39c63177-b7ad-478b-a009-69b8fa043e6f", title: "Crossy Road", description: "Unser neues Spiel auf CazinoMate", buttonText: "Jetzt Spielen", imageUrl: "/images/crossy-road.svg", isGreen: false},
      {navigationUrl: "/shop", title: "Promo", description: "Kaufen sie ein Paket", buttonText: "Jetzt Kaufen", imageUrl: "/images/mrCrabs.svg", isGreen: true}
    ,{navigationUrl: "/game/92ed9e52-afd8-49a5-8b09-d7a049783725", title: "Slots", description: "Unser neues Spiel auf CazinoMate", buttonText: "Jetzt Spielen", imageUrl: "/images/slots.svg", isGreen: false}];
  }

  public getAnnouncements(): AnnouncementModel[] {
     return this.announcements;
  }
}
