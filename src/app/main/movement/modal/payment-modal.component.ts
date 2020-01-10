import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Custom services
import { CashTransactionService } from 'src/app/services/cash-transaction.service';
import { DocumentService } from 'src/app/services/document.service';

@Component({
    selector: '[payment-modal]',
    templateUrl: './payment-modal.template.html',
    styleUrls: [ './payment-modal.style.scss' ]
})

export class PaymentModalComponent implements OnInit {

    cashRegisters: any = [];

    cashTransaction: any = {};
    cashRegister: any = {};
    document: any = {};
    stakeholder: any = {};

    paymentType: any;

    constructor(
        private _cashTransaction: CashTransactionService,
        private _document: DocumentService,
        private _error: ErrorHandlerService,
        private _toastr: ToastrService,
        private _bsModalRef: BsModalService,
        public bsModalRef: BsModalRef ) {}
  
    ngOnInit() {}

    insert() {
        if(this.document.balance == 0) {
            this._toastr.error('El documento no tiene saldo pendiente de pago!', 'Error 404', { timeOut: 5000 });
            this.bsModalRef.hide();
        } else {
            this.cashTransaction.id = 0;
            this.cashTransaction.documentId = this.document.id;
            this.cashTransaction.currencyId = this.document.currencyId;
            this.cashTransaction.paymentOrCharge = this.paymentType;
            this._cashTransaction.insert(this.cashTransaction)
                .subscribe(res => {
                    this.document.balance = this.document.balance - this.cashTransaction.payment;
                    if(this.document.balance == 0) {
                        this.document.paidStatus = 'C';
                    } else {
                        this.document.paidStatus = 'P';
                    }
                    this._document.insert(this.document)
                        .subscribe(res => {
                            this._toastr.success('El pago fue procesado con exito!', 'Status 200', { timeOut: 5000 });
                            this._bsModalRef.setDismissReason('true');
                            this.bsModalRef.hide();
                        },
                        error => {
                            this._error.errorHandler(error);
                        });
                },
                error => {
                    this._error.errorHandler(error);
                });
        }
    }

    onPaymentChange() {
        if(this.cashTransaction.payment != null) {
            this.cashRegister = this.cashRegisters.find(c => c.id == this.cashTransaction.cashRegisterId)
            this.cashTransaction.paymentCharges = (this.cashTransaction.payment * this.cashRegister.paymentFee);
            this.cashTransaction.paymentDeposit = this.cashTransaction.payment - this.cashTransaction.paymentCharges;
        }
    }
}
