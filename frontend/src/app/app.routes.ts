import { Routes } from '@angular/router';
import {HelloListComponent} from "./hello-list/hello-list.component";
import {authGuard} from "./auth.guard";
import {SidebarComponent} from "./elements/sidebar/sidebar.component";

export const routes: Routes = [
  { path: 'hello', component: HelloListComponent , canActivate: [authGuard] },
  { path: 'sidebar', component: SidebarComponent}
];
