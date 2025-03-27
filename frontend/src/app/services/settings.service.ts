import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewPassword} from "../models/NewPassword";
import {NewUsername} from "../models/NewUsername";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private apiUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  changePassword(userPassword: NewPassword): void{
    this.http.put<NewPassword>(this.apiUrl + "/password", userPassword).subscribe()
  }
  changeUsername(username: NewUsername): void{
    this.http.put<NewUsername>(this.apiUrl + "/username", username).subscribe()
  }
}
