import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-pseudo-text-input',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './pseudo-text-input.component.html',
  styleUrl: './pseudo-text-input.component.scss'
})
export class PseudoTextInputComponent {
  @Input() label!: string | undefined;
  @Input() placeholder!: string | undefined;
  @Input() isPassword!: boolean | undefined;
  @Input() isEditable!: boolean | undefined;
  @Input() isVerified!: boolean | undefined;
  @Input() settingsBox!: HTMLDivElement;

  showModal(): void {
    this.settingsBox.style.display = "flex";
  }
}
