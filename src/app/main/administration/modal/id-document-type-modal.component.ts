import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Custom services
import { IdDocumentTypeService } from '../../../services/id-document-type.service';

@Component({
  selector: '[id-document-type-modal]',
  templateUrl: './id-document-type-modal.template.html',
  styleUrls: [ './id-document-type-modal.style.scss' ]
})

export class IdDocumentTypeModalComponent implements OnInit {

    idDocumentType: any = {};

    constructor(
        private _idDocumentType: IdDocumentTypeService,
        private _error: ErrorHandlerService,
        private _toastr: ToastrService,
        private _bsModalRef: BsModalService,
        public bsModalRef: BsModalRef ) {}
  
    ngOnInit() {}

    submit() {
        if(this.idDocumentType.id == 0) {
            this._idDocumentType.insert(this.idDocumentType)
                .subscribe(res => {
                    this._toastr.success('El registro se ha guardado de forma exitosa!', 'Status 200', { timeOut: 5000 });
                    this._bsModalRef.setDismissReason('true');
                    this.bsModalRef.hide();
                },
                error => {
                    this._error.errorHandler(error);
                });
        } else {
            this._idDocumentType.insert(this.idDocumentType)
                .subscribe(res => {
                    this._toastr.success('El registro se ha actualizado de forma exitosa!', 'Status 200', { timeOut: 5000 });
                    this._bsModalRef.setDismissReason('true');
                    this.bsModalRef.hide();
                },
                error => {
                    this._error.errorHandler(error);
                });
        }
    }
}
