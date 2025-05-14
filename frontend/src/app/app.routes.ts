import { Routes } from '@angular/router';
import {authGuard} from "./auth.guard";
import {HomeComponent} from "./pages/home/home.component";
import {ShopComponent} from "./pages/shop/shop.component";
import {SettingsComponent} from "./pages/settings/settings.component";
import {OrderConfirmationComponent} from "./pages/order-confirmation/order-confirmation.component";
import {FaqComponent} from "./pages/faq/faq.component";
import {PayoutComponent} from "./pages/payout/payout.component";

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'shop', component: ShopComponent},
  { path: 'payout', component: PayoutComponent},
  { path: 'order-confirmation', component: OrderConfirmationComponent},
  {path: 'settings', component: SettingsComponent, canActivate: [authGuard]},
  {path: 'faq', component: FaqComponent}
];
