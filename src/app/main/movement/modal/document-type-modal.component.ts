import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Custom services
import { DocumentTypeService } from 'src/app/services/document-type.service';

@Component({
    selector: '[document-type-modal]',
    templateUrl: './document-type-modal.template.html',
    styleUrls: [ './document-type-modal.style.scss' ]
})

export class DocumentTypeModalComponent implements OnInit {

    documentType: any = {};

    constructor(
        private _documentType: DocumentTypeService,
        private _error: ErrorHandlerService,
        private _toastr: ToastrService,
        private _bsModalRef: BsModalService,
        public bsModalRef: BsModalRef ) {}
  
    ngOnInit() {}

    insert() {
        if(this.documentType.id == 0) {
            this._documentType.insert(this.documentType)
                .subscribe(res => {
                    this._toastr.success('El tipo de documento ha sido creado de forma exitosa!', 'Status 200', { timeOut: 5000 });
                    this._bsModalRef.setDismissReason('true');
                    this.bsModalRef.hide();
                },
                error => {
                    this._error.errorHandler(error);
                });
        } else {
            this._documentType.insert(this.documentType)
                .subscribe(res => {
                    this._toastr.success('El tipo de documento ha sido actualizado de forma exitosa!', 'Status 200', { timeOut: 5000 });
                    this._bsModalRef.setDismissReason('true');
                    this.bsModalRef.hide();
                },
                error => {
                    this._error.errorHandler(error);
                });
        }
    }
}
