import { Routes } from '@angular/router';
import {authGuard} from "./auth.guard";
import {HomeComponent} from "./pages/home/home.component";

export const routes: Routes = [
  { path: '', component: HomeComponent}
];
