import { Component } from '@angular/core';
import {AnnouncementCardComponent} from "../announcement-card/announcement-card.component";
import {AnnouncementService} from "../../services/announcement.service";
import {AnnouncementModel} from "../../models/announcementModel";

@Component({
  selector: 'app-announcement-bar',
  imports: [
    AnnouncementCardComponent
  ],
  templateUrl: './announcement-bar.component.html',
  styleUrl: './announcement-bar.component.scss'
})
export class AnnouncementBarComponent {

  public Announcements: AnnouncementModel[] = [];

  constructor(private announcementService: AnnouncementService) {
    this.Announcements = this.announcementService.getAnnouncements();
  }
}

