import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { AuthService } from 'src/app/services/auth.service';
import { IdDocumentTypeService } from 'src/app/services/id-document-type.service';

@Component({
    selector: '[delete-modal]',
    templateUrl: './delete-modal.template.html',
    styleUrls: [ './delete-modal.style.scss' ]
})

export class DeleteModalComponent implements OnInit {
    
    type:string = null;
    id: any = null;

    constructor(
        private _auth: AuthService,
        private _idDocument: IdDocumentTypeService,
        private _error: ErrorHandlerService,
        private _toastr: ToastrService,
        private _bsModalRef: BsModalService,
        public bsModalRef: BsModalRef
    ) {}
  
    ngOnInit() {}

    confirm() {
        switch (this.type) {

            case 'user': {
                this._auth.deleteUser(this.id)
                    .subscribe(res => {
                        this._toastr.success('El registro ha sido eliminado!', 'Status 200', { timeOut: 5000 });
                        this._bsModalRef.setDismissReason('true');
                        this.bsModalRef.hide();
                    },
                    error => {
                        this._error.errorHandler(error);
                    });
                break;
            };
            
            case 'id-document': {
                this._idDocument.remove(this.id)
                    .subscribe(res => {
                        this._toastr.success('El tipo de documento de identidad ha sido eliminado!', 'Status 200', { timeOut: 5000 });
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
