import { Routes } from '@angular/router';
import { BlockNumberComponent } from './components/block-number/block-number.component';
import { UsdtBalanceComponent } from './components/usdt-balance/usdt-balance.component';

export const routes: Routes = [
  { path: 'blockNumber', component: BlockNumberComponent },
  { path: 'balance', component: UsdtBalanceComponent },
];
