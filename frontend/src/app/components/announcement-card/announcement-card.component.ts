import {Component, Input} from '@angular/core';
import {AnnouncementModel} from "../../models/announcementModel";
import {Router} from "@angular/router";

@Component({
  selector: 'app-announcement-card',
  imports: [
  ],
  templateUrl: './announcement-card.component.html',
  styleUrl: './announcement-card.component.scss'
})
export class AnnouncementCardComponent {

  @Input({ required: true}) announcementData: AnnouncementModel = new AnnouncementModel();

  constructor(private router: Router) {
  }

  public onClick(){
    this.router.navigateByUrl(this.announcementData.navigationUrl)
  }
}
