import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { CashRegisterService } from 'src/app/services/cash-register.service';

// Modals
import { CashRegisterModalComponent } from '../modal/cash-register-modal.component';
import { DeleteModalComponent } from '../modal/delete-modal.component';

@Component({
    selector: '[cash-register]',
    styleUrls: [ './cash-register.style.scss' ],
    templateUrl: './cash-register.template.html'
})

export class CashRegisterComponent implements OnInit {

    data: any = [];

    cashRegister: any = {};

    bsModalRef: BsModalRef;
    filteredName: string;

    constructor(
        private _cashRegister: CashRegisterService,
        private _error: ErrorHandlerService,
        private _bsModalService: BsModalService
    ) {}

    ngOnInit() {
        this.refreshData();
    }

    refreshData() {
        this._cashRegister.get(0)
            .subscribe(res => {
                this.data = res;
            },
            error => {
                this._error.errorHandler(error);
            });
    }

    newCashRegister() {
        this.cashRegister.id = 0;
        this.bsModalRef = this._bsModalService.show(CashRegisterModalComponent);
        this.bsModalRef.content.cashRegister = this.cashRegister;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }

    editCashRegister(cashRegister: any) {
        this.bsModalRef = this._bsModalService.show(CashRegisterModalComponent);
        this.bsModalRef.content.cashRegister = cashRegister;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }

    deleteCashRegister(id: any) {
        this.bsModalRef = this._bsModalService.show(DeleteModalComponent);
        this.bsModalRef.content.type = 'cash-register';
        this.bsModalRef.content.id = id;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }
}
