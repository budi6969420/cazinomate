// settings.component.ts
import { Component, ElementRef, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { NewPassword } from "../../models/newPassword";
import { UserService } from "../../services/user.service";
import { NewUsername } from "../../models/newUsername";
import { user } from "../../models/user";
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import {LoadingSpinnerComponent} from "../../components/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    LoadingSpinnerComponent
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

  user: user | null = null;
  isLoading = false;

  constructor(
      private userService: UserService,
      private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.updateSelfUserInfo().subscribe((userData) => {
      this.user = userData;
      this.cdr.markForCheck();
      this.isLoading = false;
    });
  }

  showPasswordBox(): void {
    this.passwordBox.nativeElement.style.display = "flex";
    this.resetPasswordFields();
  }

  closePasswordBox(save: boolean = false): void {
    if (save && this.newPasswordsAreEqual() && this.currentPasswordforChangingPassword && this.currentPasswordforChangingPassword !== this.newPassword) {
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
      if (save) console.warn("Save aborted. Passwords might not match or current password missing.");

      this.passwordBox.nativeElement.style.display = "none";
      this.resetPasswordFields();
    }
  }

  showUsernameBox(): void {
    if (this.user) {
      this.usernameBox.nativeElement.style.display = "flex";
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
          console.log("Username changed successfully.");

          this.user = updatedUser;
          this.usernameBox.nativeElement.style.display = "none";
          this.resetUsernameFields();
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error("Changing username failed:", err);
        }
      });
    } else {
      if (save) console.warn("Save aborted. New username or current password missing.");

      this.usernameBox.nativeElement.style.display = "none";
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
