export class NewPassword {
  password: string;
  repeatedPassword: string;

  constructor(password: string, repeatedPassword: string) {
    this.password = password;
    this.repeatedPassword = repeatedPassword;
  }
}
