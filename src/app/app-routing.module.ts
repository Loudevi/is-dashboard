import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// Components

const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full'  },

    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'app', loadChildren: './main/layout/layout.module#LayoutModule' },
]

@NgModule({
    imports: [
            RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
        ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
