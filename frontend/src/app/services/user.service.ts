import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewPassword} from "../models/newPassword";
import {NewUsername} from "../models/newUsername";
import {user} from "../models/user";
import {Observable, of, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {CrossyRoadGameVariables} from "../games/crossy-road/crossyRoadGameVariables";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/user';
  public myUser: user | null = null;
  public myBalance: number = 0;

  constructor(private http: HttpClient) {
    this.updateSelfBalance().subscribe();
    this.updateSelfUserInfo().subscribe();
  }

  updateSelfUserInfo() {
    return this.http.get<user>(this.apiUrl + "/self").pipe(
      tap(user => {
        this.myUser = user
      }),
      catchError(err => {
        this.myUser = null;
        return of(null);
      })
    );
  }
  updateSelfBalance() {
    return this.http.get<any>(`${this.apiUrl}/self/balance`).pipe(
      tap(balance => {
        this.myBalance = balance.balance
      }),
      catchError(err => {
        this.myBalance = 0;
        return of(null);
      })
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
