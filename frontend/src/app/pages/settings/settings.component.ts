import {Component, ElementRef, ViewChild} from '@angular/core';
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
  @ViewChild('passwordBox') passwordBox!: ElementRef;
  @ViewChild('usernameBox') usernameBox!: ElementRef;

  closePasswordBox(save: boolean = false): void {
    this.passwordBox.nativeElement.style.display = "none";
  }
  closeUsernameBox(save: boolean = false): void {
    this.usernameBox.nativeElement.style.display = "none";
  }
}
