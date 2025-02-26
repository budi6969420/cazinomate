import { Component } from '@angular/core';
import {Observable, of} from "rxjs";
import {Hello} from "../Hello";
import {HttpClient, HttpClientModule, HttpHeaders, provideHttpClient} from "@angular/common/http";
import {AsyncPipe} from "@angular/common";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-hello-list',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  providers: [KeycloakService],
  templateUrl: './hello-list.component.html'})
export class HelloListComponent {
  employees$: Observable<Hello[]>;

  constructor(private http: HttpClient) {
    this.employees$ = of([]);
    this.fetchData();
  }

  fetchData() {
    this.employees$ = this.http.get<Hello[]>('/backend/hellos');
  }


}
