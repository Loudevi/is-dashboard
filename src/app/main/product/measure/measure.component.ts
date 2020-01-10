import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { MeasureService } from 'src/app/services/measure.service';

// Modals
import { DeleteModalComponent } from '../modal/delete-modal.component';
import { MeasureModalComponent } from '../modal/measure-modal.component';

@Component({
    selector: 'app-measure',
    templateUrl: './measure.template.html',
    styleUrls: [ './measure.style.scss' ]
})

export class MeasureComponent implements OnInit {

    data: any = [];

    measure: any = {};

    bsModalRef: BsModalRef;

    constructor(
        private _measure: MeasureService,
        private _error: ErrorHandlerService,
        private _bsModalService: BsModalService
    ) {}

    ngOnInit() {
        this.refreshData();
    }

    refreshData() {
        this._measure.get(0)
            .subscribe(res => {
                this.data = res;
            },
            error => {
                this._error.errorHandler(error);
            })
    }

    newMeasure() {
        this.measure.id = 0;
        this.bsModalRef = this._bsModalService.show(MeasureModalComponent);
        this.bsModalRef.content.measure = this.measure;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }

    editMeasure(measure) {
        this.bsModalRef = this._bsModalService.show(MeasureModalComponent);
        this.bsModalRef.content.measure = measure;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }

    deleteMeasure(id: any) {
        this.bsModalRef = this._bsModalService.show(DeleteModalComponent);
        this.bsModalRef.content.type = 'measure';
        this.bsModalRef.content.id = id;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }
}
