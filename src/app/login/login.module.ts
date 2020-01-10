import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Components
import { LoginComponent } from './login.component';

export const routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        FontAwesomeModule,
        RouterModule.forChild(routes),
    ]
})
export class LoginModule {
    static routes = routes;
}
