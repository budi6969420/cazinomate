import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NewPassword} from "../models/newPassword";
import {NewUsername} from "../models/newUsername";
import {user} from "../models/user";
import {Observable, of, tap} from "rxjs";
import {catchError} from "rxjs/operators";
import {environment} from "../../environments/environment";
import {Transaction} from "../models/transaction";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.backendApiUrl + 'user';
  public myUser: user | null = null;
  public myBalance: number = 0;

  constructor(private http: HttpClient) {
    this.updateSelfBalance().subscribe();
    this.updateSelfUserInfo().subscribe();
  }

  updateSelfUserInfo() {
    return this.http.get<user>(this.apiUrl + "/self").pipe(
      tap(user => this.myUser = user),
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

  getSelfTransactions() {
    return this.http.get<Transaction[]>(`${this.apiUrl}/self/transactions`);
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
