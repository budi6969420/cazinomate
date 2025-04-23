import { Routes } from '@angular/router';
import {authGuard} from "./auth.guard";
import {HomeComponent} from "./pages/home/home.component";
import {GameViewComponent} from "./pages/game-view/game-view.component";
import {SettingsComponent} from "./pages/settings/settings.component";

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'game/:gameId', component: GameViewComponent, canActivate: [authGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard]}
];
