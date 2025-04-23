import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewPassword} from "../models/newPassword";
import {NewUsername} from "../models/newUsername";
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
  changeUsername(username: NewUsername): Observable<User>{
    return this.http.put<User>(this.apiUrl + "/username", username);
  }
  changePassword(userPassword: NewPassword): Observable<User>{
    return this.http.put<User>(this.apiUrl + "/password", userPassword);
  }
}
