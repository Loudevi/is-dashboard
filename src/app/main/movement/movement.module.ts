import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RouterModule } from '@angular/router';

// Components
import { DocumentTypeComponent } from './document-type/document-type.component';
import { ESaleTemplateComponent } from './e-sale-template/e-sale-template.component';
import { InvoiceTemplateComponent } from './invoice-template/invoice-template.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { PurchaseTemplateComponent } from './purchase-template/purchase-template.component';
import { SaleComponent } from './sale/sale.component';
import { SaleTemplateComponent } from './sale-template/sale-template.component';

// Modals
import { DeleteModalComponent } from './modal/delete-modal.component';
import { DocumentTypeModalComponent } from './modal/document-type-modal.component';
import { PaymentModalComponent } from './modal/payment-modal.component';

// Pipes
import { CorrelativeFilterPipe } from './pipe/correlative-filter.pipe';
import { IdDocumentFilterPipe } from './pipe/id-document-filter.pipe';
import { NameFilterPipe } from './pipe/name-filter.pipe';

export const routes = [
    { path: 'document-type', component: DocumentTypeComponent },
    { path: 'e-sale-template', component: ESaleTemplateComponent },
    { path: 'invoice-template/:id', component: InvoiceTemplateComponent },
    { path: 'purchase', component: PurchaseComponent },
    { path: 'purchase-template', component: PurchaseTemplateComponent },
    { path: 'sale', component: SaleComponent },
    { path: 'sale-template', component: SaleTemplateComponent },
];

@NgModule({
    declarations: [
        DocumentTypeComponent,
        ESaleTemplateComponent,
        InvoiceTemplateComponent,
        PurchaseComponent,
        PurchaseTemplateComponent,
        SaleComponent,
        SaleTemplateComponent,
        DeleteModalComponent,
        DocumentTypeModalComponent,
        PaymentModalComponent,
        CorrelativeFilterPipe,
        IdDocumentFilterPipe,
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
        DocumentTypeModalComponent,
        PaymentModalComponent
    ]
})
export class MovementModule {
    static routes = routes;
}
