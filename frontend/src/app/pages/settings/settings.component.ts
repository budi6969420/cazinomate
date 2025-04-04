// settings.component.ts
import { Component, ElementRef, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { PseudoTextInputComponent } from "../../atoms/pseudo-text-input/pseudo-text-input.component";
import { NewPassword } from "../../models/NewPassword";
import { UserService } from "../../services/user.service";
import { NewUsername } from "../../models/NewUsername";
import { User } from "../../models/user";
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    PseudoTextInputComponent,
    FormsModule,
    CommonModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {
  @ViewChild('passwordBox') passwordBox!: ElementRef;
  @ViewChild('usernameBox') usernameBox!: ElementRef;

  newPassword!: string;
  repeatedNewPassword!: string;
  currentPasswordforChangingPassword!: string;
  newUsername!: string;
  currentPasswordforChangingUsername!: string;

  user: User | null = null;

  constructor(
      private userService: UserService,
      private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe((userData) => {
      this.user = userData;
      this.cdr.markForCheck();
    });
  }

  showPasswordBox(): void {
    this.passwordBox.nativeElement.style.display = "block";
    this.resetPasswordFields();
  }

  closePasswordBox(save: boolean = false): void {
    if (save && this.newPasswordsAreEqual() && this.currentPasswordforChangingPassword) {
      const userPassword = new NewPassword(this.newPassword, this.currentPasswordforChangingPassword);
      this.userService.changePassword(userPassword).subscribe({
        next: () => {
          console.log("Password changed successfully.");
          this.passwordBox.nativeElement.style.display = "none";
          this.resetPasswordFields();
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error("Changing password failed:", err);
        }
      });
    } else {
      this.passwordBox.nativeElement.style.display = "none";
      if (save) {
        console.warn("Save aborted. Passwords might not match or current password missing.");
      }
      this.resetPasswordFields();
    }
  }

  showUsernameBox(): void {
    if (this.user) {
      this.usernameBox.nativeElement.style.display = "block";
      this.resetUsernameFields();
    } else {
      console.warn("Cannot show username box: user data not loaded yet.");
    }
  }

  closeUsernameBox(save: boolean = false): void {
    if (save && this.newUsername && this.currentPasswordforChangingUsername) {
      const usernameData = new NewUsername(this.newUsername, this.currentPasswordforChangingUsername);
      this.userService.changeUsername(usernameData).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          console.log("Username changed successfully.");
          this.usernameBox.nativeElement.style.display = "none";
          this.resetUsernameFields();
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error("Changing username failed:", err);
        }
      });
    } else {
      this.usernameBox.nativeElement.style.display = "none";
      if (save) {
        console.warn("Save aborted. New username or current password missing.");
      }
      this.resetUsernameFields();
    }
  }

  newPasswordsAreEqual(): boolean {
    return !!this.newPassword &&
        !!this.repeatedNewPassword &&
        this.newPassword === this.repeatedNewPassword;
  }

  private resetPasswordFields(): void {
    this.currentPasswordforChangingPassword = '';
    this.newPassword = '';
    this.repeatedNewPassword = '';
    this.cdr.markForCheck();
  }

  private resetUsernameFields(): void {
    this.newUsername = '';
    this.currentPasswordforChangingUsername = '';
    this.cdr.markForCheck();
  }
}
