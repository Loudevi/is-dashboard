import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RouterModule } from '@angular/router';

// Components
import { CashRegisterComponent } from './cash-register/cash-register.component';
import { CashTransactionComponent } from './cash-transaction/cash-transaction.component';
import { ExchangeRateComponent } from './exchange-rate/exchange-rate.component';

// Modals
import { CashRegisterModalComponent } from './modal/cash-register-modal.component';
import { DeleteModalComponent } from './modal/delete-modal.component';
import { ExchangeRateModalComponent } from './modal/exchange-rate-modal.component';

// Pipes
import { AmountFilterPipe } from './pipe/amount-filter.pipe';
import { DocumentFilterPipe } from './pipe/correlative-filter.pipe';
import { NameFilterPipe } from './pipe/name-filter.pipe';
import { StakeholderFilterPipe } from './pipe/stakeholder-filter.pipe';

export const routes = [
    { path: 'cash-register', component: CashRegisterComponent },
    { path: 'exchange-rate', component: ExchangeRateComponent },
    { path: 'cash-transaction', component: CashTransactionComponent },
];

@NgModule({
    declarations: [
        CashRegisterComponent,
        CashTransactionComponent,
        ExchangeRateComponent,
        CashRegisterModalComponent,
        DeleteModalComponent,
        ExchangeRateModalComponent,
        AmountFilterPipe,
        DocumentFilterPipe,
        NameFilterPipe,
        StakeholderFilterPipe
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
        CashRegisterModalComponent,
        DeleteModalComponent,
        ExchangeRateModalComponent
    ]
})
export class CashRegisterModule {
    static routes = routes;
}
