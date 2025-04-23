import { Routes } from '@angular/router';
import {authGuard} from "./auth.guard";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {HomeComponent} from "./pages/home/home.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {ShopComponent} from "./pages/shop/shop.component";

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'shop', component: ShopComponent},
  {path: 'settings', component: SettingsComponent, canActivate: [authGuard]}
];
