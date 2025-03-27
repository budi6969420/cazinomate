import {Component, ElementRef, ViewChild} from '@angular/core';
import {PseudoTextInputComponent} from "../../atoms/pseudo-text-input/pseudo-text-input.component";
import {NewPassword} from "../../models/NewPassword";
import {UserService} from "../../services/user.service";
import {NewUsername} from "../../models/NewUsername";
import {User} from "../../models/user";

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

  @ViewChild('newPassword') newPassword!: ElementRef;
  @ViewChild('repeatedNewPassword') repeatedNewPassword!: ElementRef;
  @ViewChild('newUsername') newUsername!: ElementRef;

  user!: User;

  constructor(private userService: UserService) {
    userService.getUserInfo().subscribe((user) => {this.user = user})
  }

  closePasswordBox(save: boolean = false): void {
    this.passwordBox.nativeElement.style.display = "none";

    if(save){
      const userPassword: NewPassword = new NewPassword(this.newPassword.nativeElement.value, this.repeatedNewPassword.nativeElement.value)
      this.userService.changePassword(userPassword);
    }
  }

  closeUsernameBox(save: boolean = false): void {
    this.usernameBox.nativeElement.style.display = "none";

    if(save){
      const username: NewUsername = new NewUsername(this.newUsername.nativeElement.value)
      this.userService.changeUsername(username);
    }
  }

  newPasswordsAreEqual(): boolean {
    const newPasswordValue = this.newPassword?.nativeElement.value;
    const repeatedNewPasswordValue = this.repeatedNewPassword?.nativeElement.value;
    return newPasswordValue === repeatedNewPasswordValue;
  }
}
