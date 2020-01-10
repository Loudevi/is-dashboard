import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
    { path: '', component: LayoutComponent, children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'administration', loadChildren: '../administration/administration.module#AdministrationModule' },
        { path: 'cash-register', loadChildren: '../cash-register/cash-register.module#CashRegisterModule' },
        { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
        { path: 'movement', loadChildren: '../movement/movement.module#MovementModule' },
        { path: 'product', loadChildren: '../product/product.module#ProductModule' },
        { path: 'stakeholder', loadChildren: '../stakeholder/stakeholder.module#StakeholderModule' },
    ]}
];

export const ROUTES = RouterModule.forChild(routes);
