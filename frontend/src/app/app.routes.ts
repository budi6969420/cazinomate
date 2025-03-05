import { Routes } from '@angular/router';
import {authGuard} from "./auth.guard";
import {SidebarComponent} from "./components/sidebar/sidebar.component";

export const routes: Routes = [
  { path: 'sidebar', component: SidebarComponent}
];
