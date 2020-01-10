import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { CashRegisterService } from 'src/app/services/cash-register.service';

@Component({
    selector: '[cash-register-modal]',
    templateUrl: './cash-register-modal.template.html',
    styleUrls: ['cash-register-modal.style.scss']
})

export class CashRegisterModalComponent implements OnInit {

    cashRegister: any = {};

    constructor(
        private _cashRegister: CashRegisterService,
        private _error: ErrorHandlerService,
        private _toastr: ToastrService,
        private _bsModalRef: BsModalService,
        public bsModalRef: BsModalRef
    ) {}
  
    ngOnInit() {}

    insertCashRegister() {
        if(this.cashRegister.id == 0) {
            this.cashRegister.penBalance = 0;
            this.cashRegister.usdBalance = 0;
            this._cashRegister.insert(this.cashRegister)
                .subscribe(res => {
                    this._toastr.success('La caja y/o banco ha sido creado de forma exitosa!', 'Status 200', { timeOut: 5000 });
                    this._bsModalRef.setDismissReason('true');
                    this.bsModalRef.hide();
                },
                error => {
                    this._error.errorHandler(error);
                });
        } else {
            this._cashRegister.insert(this.cashRegister)
                .subscribe(res => {
                    this._toastr.success('La caja y/o banco ha sido actualizado de forma exitosa!', 'Status 200', { timeOut: 5000 });
                    this._bsModalRef.setDismissReason('true');
                    this.bsModalRef.hide();
                },
                error => {
                    this._error.errorHandler(error);
                });
        }
    }
}
