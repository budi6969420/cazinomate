export class NewUsername {
  username: string;
  currentPassword: string;

  constructor(username: string, currentPassword: string){
    this.username = username;
    this.currentPassword = currentPassword
  }
}
