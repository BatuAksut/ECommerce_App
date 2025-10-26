import { Routes } from '@angular/router';
import { CustomerComponent } from './admin/components/customer/customer.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { OrderComponent } from './admin/components/order/order.component';
import { ProductsComponent } from './admin/components/products/products.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { HomeComponent } from './ui/components/home/home.component';
import { CartComponent } from './ui/components/cart/cart.component';

export const routes: Routes = [
  // 🌟 ADMIN AREA
  {
    path: 'admin',
    component: LayoutComponent,
    children: [
      { path: 'customers', component: CustomerComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'orders', component: OrderComponent },
      { path: 'products', component: ProductsComponent },
      {path:"",component:DashboardComponent}
    ]
  },

  // 🌟 PUBLIC / UI AREA
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'shop/cart', component: CartComponent },
  { path: 'shop/products', component: ProductsComponent },

  // 🌟 Fallback route (404)
  { path: '**', redirectTo: '' }
];
