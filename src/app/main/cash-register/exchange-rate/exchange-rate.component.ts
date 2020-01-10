import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';

// Modals
import { DeleteModalComponent } from '../modal/delete-modal.component';
import { ExchangeRateModalComponent } from '../modal/exchange-rate-modal.component';

@Component({
    selector: '[exchange-rate]',
    styleUrls: [ './exchange-rate.style.scss' ],
    templateUrl: './exchange-rate.template.html'
})

export class ExchangeRateComponent implements OnInit {

    data: any = [];

    exchangeRate: any = {};

    bsModalRef: BsModalRef;

    constructor(
        private _exchangeRate: ExchangeRateService,
        private _error: ErrorHandlerService,
        private _bsModalService: BsModalService,
    ) {}

    ngOnInit() {
        this.refreshData();
    }

    refreshData() {
        this._exchangeRate.get(0, 0)
            .subscribe(res => {
                this.data = res;
            },
            error => {
                this._error.errorHandler(error);
            });
    }

    newExchangeRate() {
        this.exchangeRate.id = 0;
        this.bsModalRef = this._bsModalService.show(ExchangeRateModalComponent);
        this.bsModalRef.content.cashRegister = this.exchangeRate;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }

    editExchangeRate(exchangeRate: any) {
        this.bsModalRef = this._bsModalService.show(ExchangeRateModalComponent);
        this.bsModalRef.content.exchangeRate = exchangeRate;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }

    deleteExchangeRate(id: any) {
        this.bsModalRef = this._bsModalService.show(DeleteModalComponent);
        this.bsModalRef.content.type = 'exchange-rate';
        this.bsModalRef.content.id = id;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }
}
