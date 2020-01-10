import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { CashRegisterService } from 'src/app/services/cash-register.service';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

@Component({
    selector: '[delete-modal]',
    templateUrl: './delete-modal.template.html',
    styleUrls: [ './delete-modal.style.scss' ]
})

export class DeleteModalComponent implements OnInit {
    
    type:string = null;
    id: any = null;

    constructor(
        private _cashRegister: CashRegisterService,
        private _exchangeRate: ExchangeRateService,
        private _error: ErrorHandlerService,
        private _toastr: ToastrService,
        private _bsModalRef: BsModalService,
        public bsModalRef: BsModalRef
    ) {}
  
    ngOnInit() {}

    confirm() {
        switch (this.type) {

            case 'cash-register': {
                this._cashRegister.remove(this.id)
                    .subscribe(res => {
                        this._toastr.success('La caja y/o banco ha sido eliminado!', 'Status 200', { timeOut: 5000 });
                        this._bsModalRef.setDismissReason('true');
                        this.bsModalRef.hide();
                    },
                    error => {
                        this._error.errorHandler(error);
                    });
                break;
            };

            case 'exchange-rate': {
                this._exchangeRate.remove(this.id)
                    .subscribe(res => {
                        this._toastr.success('La tasa de cambio ha sido eliminada!', 'Status 200', { timeOut: 5000 });
                        this._bsModalRef.setDismissReason('true');
                        this.bsModalRef.hide();
                    },
                    error => {
                        this._error.errorHandler(error);
                    });
                break;
            };
            
        };
    }
}
