import { Routes } from '@angular/router';
import {authGuard} from "./auth.guard";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {HomeComponent} from "./pages/home/home.component";

export const routes: Routes = [
  { path: '', component: HomeComponent}
];
