import { Routes } from '@angular/router';
import {authGuard} from "./auth.guard";
import {HomeComponent} from "./pages/home/home.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {FaqComponent} from "./pages/faq/faq.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'settings', component: SettingsComponent, canActivate: [authGuard]},
  {path: 'faq', component: FaqComponent}
];
