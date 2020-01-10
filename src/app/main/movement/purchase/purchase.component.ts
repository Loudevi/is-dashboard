import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { CashRegisterService } from 'src/app/services/cash-register.service';
import { DocumentService } from 'src/app/services/document.service';

// Modals
import { PaymentModalComponent } from '../modal/payment-modal.component';

@Component({
    selector: '[purchase]',
    styleUrls: [ './purchase.style.scss' ],
    templateUrl: './purchase.template.html'
})

export class PurchaseComponent implements OnInit {

    data: any = [];
    cashRegisters: any = [];

    bsModalRef: BsModalRef;
    filteredCorrelative: number;
    filteredIdDocument: string;
    filteredName: string;

    constructor(
        private _cashRegister: CashRegisterService,
        private _document: DocumentService,
        private _error: ErrorHandlerService,
        private _router: Router,
        private _bsModalService: BsModalService
    ) {}

    ngOnInit() {
        this.refreshData();
        this.modalLists();
    }

    refreshData() {
        this._document.get(0, 'P')
            .subscribe(res => {
                this.data = res;
            },
            error => {
                this._error.errorHandler(error);
            });
    }

    modalLists() {
        this._cashRegister.get(0)
            .subscribe(res => {
                this.cashRegisters = res;
            },
            error => {
                this._error.errorHandler(error);
            });
    }

    newPurchase() {
        this._router.navigateByUrl('app/movement/purchase-template');
    }

    newPayment(document: any) {
        this.bsModalRef = this._bsModalService.show(PaymentModalComponent);
        this.bsModalRef.content.paymentType = 'P';
        this.bsModalRef.content.cashRegisters = this.cashRegisters;
        this.bsModalRef.content.document = document;
        this.bsModalRef.content.stakeholder = document.stakeholder;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }

    seeDocument(id: any) {
        this._router.navigateByUrl('app/movement/invoice-template/' + id);
    }

    seeScan(scan: any) {
        window.open(scan);
    }
}
