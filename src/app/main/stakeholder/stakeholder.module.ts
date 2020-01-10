import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RouterModule } from '@angular/router';

// Components
import { ClientComponent } from './client/client.component';
import { SupplierComponent } from './supplier/supplier.component';

// Modals
import { DeleteModalComponent } from './modal/delete-modal.component';
import { StakeholderModalComponent } from './modal/stakeholder-modal.component';
import { StakeholderEmailModalComponent } from './modal/stakeholder-email-modal.component';
import { StakeholderPhoneNumberModalComponent } from './modal/stakeholder-phone-number-modal.component';

// Pipes
import { IdDocumentFilterPipe } from './pipe/id-document-filter.pipe';
import { IdTypeFilterPipe } from './pipe/id-type-filter.pipe';
import { NameFilterPipe } from './pipe/name-filter.pipe';

export const routes = [
    { path: 'client', component: ClientComponent },
    { path: 'supplier', component: SupplierComponent },
];

@NgModule({
    declarations: [
        ClientComponent,
        SupplierComponent,
        DeleteModalComponent,
        StakeholderModalComponent,
        StakeholderEmailModalComponent,
        StakeholderPhoneNumberModalComponent,
        IdDocumentFilterPipe,
        IdTypeFilterPipe,
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
        StakeholderModalComponent,
        StakeholderEmailModalComponent,
        StakeholderPhoneNumberModalComponent
    ]
})
export class StakeholderModule {
    static routes = routes;
}
