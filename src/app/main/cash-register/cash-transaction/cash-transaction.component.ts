import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { CashRegisterService } from 'src/app/services/cash-register.service';
import { CashTransactionService } from 'src/app/services/cash-transaction.service';

// Modals

@Component({
    selector: '[cash-transaction]',
    styleUrls: [ './cash-transaction.style.scss' ],
    templateUrl: './cash-transaction.template.html'
})

export class CashTransactionComponent implements OnInit {

    data: any = [];
    registers: any = [];

    cashRegisterId: any;
    filteredStakeholder: string;
    filteredDocument: string;
    filteredAmount: string;

    constructor(
        private _cashRegister: CashRegisterService,
        private _cashTransaction: CashTransactionService,
        private _error: ErrorHandlerService
    ) {}

    ngOnInit() {
        this.refreshData();
    }

    refreshData() {
        this._cashRegister.get(0)
            .subscribe(res => {
                this.registers = res;
            },
            error => {
                this._error.errorHandler(error);
            });
    }

    onCashRegisterChange() {
        this._cashTransaction.get(0, this.cashRegisterId)
            .subscribe(res => {
                this.data = res;
            },
            error => {
                this._error.errorHandler(error);
            });
    }
}
