import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

@Component({
    selector: '[exchange-rate-modal]',
    templateUrl: './exchange-rate-modal.template.html',
    styleUrls: ['exchange-rate-modal.style.scss']
})

export class ExchangeRateModalComponent implements OnInit {

    exchangeRate: any = {};

    constructor(
        private _exchangeRate: ExchangeRateService,
        private _error: ErrorHandlerService,
        private _toastr: ToastrService,
        private _bsModalRef: BsModalService,
        public bsModalRef: BsModalRef
    ) {}
  
    ngOnInit() {}

    insert() {
        if(this.exchangeRate.id == 0) {
            this._exchangeRate.insert(this.exchangeRate)
                .subscribe(res => {
                    this._toastr.success('La tasa de cambio fue ingresada de forma exitosa!', 'Status 200', { timeOut: 5000 });
                    this._bsModalRef.setDismissReason('true');
                    this.bsModalRef.hide();
                },
                error => {
                    this._error.errorHandler(error);
                });
        } else {
            this._exchangeRate.insert(this.exchangeRate)
                .subscribe(res => {
                    this._toastr.success('La tasa de cambio ha sido actualizada de forma exitosa!', 'Status 200', { timeOut: 5000 });
                    this._bsModalRef.setDismissReason('true');
                    this.bsModalRef.hide();
                },
                error => {
                    this._error.errorHandler(error);
                });
        }
    }
}
