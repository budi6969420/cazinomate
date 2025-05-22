import { Injectable } from '@angular/core';
import {AnnouncementModel} from "../models/announcementModel";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService {

  private announcements: AnnouncementModel[] = [];

  constructor() {
    this.announcements = [{navigationUrl: "/game/39c63177-b7ad-478b-a009-69b8fa043e6f", title: "Crossy Road", description: "Unser neues Spiel auf CazinoMate", buttonText: "Jetzt Spielen", imageUrl: "/images/crossy-road.svg"},
      {navigationUrl: "/shop", title: "Promo", description: "Kaufen sie ein Paket", buttonText: "Jetzt Kaufen", imageUrl: "/images/mrCrabs.svg"}];
  }

  public getAnnouncements(): AnnouncementModel[] {
     return this.announcements;
  }
}
