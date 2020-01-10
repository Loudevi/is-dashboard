import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Components
import { DashboardComponent } from './dashboard.component';

export const routes = [
    { path: '', component: DashboardComponent, pathMatch: 'full' },
];

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ]
})
export class DashboardModule {
    static routes = routes;
}
