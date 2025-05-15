import { Routes } from '@angular/router';

import {authGuard} from "./auth.guard";
import {HomeComponent} from "./pages/home/home.component";
import {ShopComponent} from "./pages/shop/shop.component";
import {GameViewComponent} from "./pages/game-view/game-view.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {OrderConfirmationComponent} from "./pages/order-confirmation/order-confirmation.component";
import {FaqComponent} from "./pages/faq/faq.component";

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'shop', component: ShopComponent},
  { path: 'order-confirmation', component: OrderConfirmationComponent, canActivate: [authGuard]},
  { path: 'settings', component: SettingsComponent, canActivate: [authGuard]},
  { path: 'faq', component: FaqComponent},
  { path: 'game/:gameId', component: GameViewComponent, canActivate: [authGuard]},
];
