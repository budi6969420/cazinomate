import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewPassword} from "../models/newPassword";
import {NewUsername} from "../models/newUsername";
import {user} from "../models/user";
import {Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/user';
  public myUser: user | null = null;
  public myBalance: number = 0;

  constructor(private http: HttpClient) {}

  updateSelfUserInfo(): Observable<user>{
    return this.http.get<user>(this.apiUrl + "/self").pipe(
      tap(user => this.myUser = user),
    );
  }
  updateSelfBalance(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/self/balance`).pipe(
      tap(balance => this.myBalance = balance)
    );
  }
  changeUsername(username: NewUsername): Observable<user>{
    return this.http.put<user>(this.apiUrl + "/username", username);
  }
  changePassword(userPassword: NewPassword): Observable<user>{
    return this.http.put<user>(this.apiUrl + "/password", userPassword);
  }
  onLogout() {
    this.myUser = null;
    this.myBalance = 0;
  }
}
