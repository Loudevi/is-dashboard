import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ROUTES } from './layout.routes';

// Components
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
    declarations: [
        LayoutComponent,
        NavbarComponent,
        SidebarComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        ROUTES        
    ]
})
export class LayoutModule {
}
