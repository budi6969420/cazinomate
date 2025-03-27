import { Component } from '@angular/core';
import {SponsorshipsComponent} from "../../components/adBar/sponsorships.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SponsorshipsComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
