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
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() isPassword!: boolean;
  @Input() isEditable!: boolean;
  @Input() isVerified!: boolean;
}
