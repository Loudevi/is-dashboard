import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RouterModule } from '@angular/router';

// Components
import { IdDocumentComponent } from './id-document/id-document.component';
import { UserComponent } from './user/user.component';

// Modals
import { DeleteModalComponent } from './modal/delete-modal.component';
import { IdDocumentTypeModalComponent } from './modal/id-document-type-modal.component';
import { UserModalComponent } from './modal/user-modal.component';

// Pipes
import { EmailFilterPipe } from './pipe/email-filter.pipe';
import { LastNameFilterPipe } from './pipe/last-name-filter.pipe';
import { NameFilterPipe } from './pipe/name-filter.pipe';

export const routes = [
    { path: 'user', component: UserComponent },
    { path: 'id-document', component: IdDocumentComponent },
];

@NgModule({
    declarations: [
        IdDocumentComponent,
        UserComponent,
        DeleteModalComponent,
        IdDocumentTypeModalComponent,
        UserModalComponent,
        EmailFilterPipe,
        LastNameFilterPipe,
        NameFilterPipe
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        ModalModule.forRoot(),
        TooltipModule,
        RouterModule.forChild(routes),
    ],
    entryComponents: [
        DeleteModalComponent,
        IdDocumentTypeModalComponent,
        UserModalComponent
    ]
})
export class AdministrationModule {
    static routes = routes;
}
