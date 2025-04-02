import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewPassword} from "../models/NewPassword";
import {NewUsername} from "../models/NewUsername";
import {User} from "../models/user";
import {Observable} from "rxjs";
import {KeycloakService} from "keycloak-angular";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) {}

  getUserInfo(): Observable<User>{
    return this.http.get<User>(this.apiUrl + "/self");
  }

  changePassword(userPassword: NewPassword): void{
    this.http.put<NewPassword>(this.apiUrl + "/password", userPassword).subscribe()
  }
  changeUsername(username: NewUsername): void{
    this.http.put<NewUsername>(this.apiUrl + "/username", username).subscribe()

  }
}
