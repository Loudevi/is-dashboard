import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Custom services
import { MeasureService } from 'src/app/services/measure.service';

@Component({
    selector: '[measure-modal]',
    templateUrl: './measure-modal.template.html',
    styleUrls: [ './measure-modal.style.scss' ]
})

export class MeasureModalComponent implements OnInit {

    measure: any = {};

    constructor(
        private _measure: MeasureService,
        private _error: ErrorHandlerService,
        private _toastr: ToastrService,
        private _bsModalRef: BsModalService,
        public bsModalRef: BsModalRef ) {}
  
    ngOnInit() {}

    insert() {
        if(this.measure.id == 0) {
            this._measure.insert(this.measure)
                .subscribe(res => {
                    this._toastr.success('La unidad de medida ha sido creada de forma exitosa!', 'Status 200', { timeOut: 5000 });
                    this._bsModalRef.setDismissReason('true');
                    this.bsModalRef.hide();
                },
                error => {
                    this._error.errorHandler(error);
                });
        } else {
            this._measure.insert(this.measure)
                .subscribe(res => {
                    this._toastr.success('La unidad de medida ha sido actualizada de forma exitosa!', 'Status 200', { timeOut: 5000 });
                    this._bsModalRef.setDismissReason('true');
                    this.bsModalRef.hide();
                },
                error => {
                    this._error.errorHandler(error);
                });
        }
    }
}
