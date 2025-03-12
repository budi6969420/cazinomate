import { Component } from '@angular/core';
import {PseudoTextInputComponent} from "../../atoms/pseudo-text-input/pseudo-text-input.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    PseudoTextInputComponent
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {

}
