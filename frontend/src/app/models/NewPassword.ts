export class NewPassword {
  password: string;
  currentPassword: string;

  constructor(password: string, currentPassword: string) {
    this.password = password;
    this.currentPassword = currentPassword;
  }
}
