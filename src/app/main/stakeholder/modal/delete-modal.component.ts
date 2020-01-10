import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { StakeholderService } from 'src/app/services/stakeholder.service';

@Component({
    selector: '[delete-modal]',
    templateUrl: './delete-modal.template.html',
    styleUrls: [ './delete-modal.style.scss' ]
})

export class DeleteModalComponent implements OnInit {
    
    type:string = null;
    id: any = null;

    constructor(
        private _stakeholder: StakeholderService,
        private _error: ErrorHandlerService,
        private _toastr: ToastrService,
        private _bsModalRef: BsModalService,
        public bsModalRef: BsModalRef
    ) {}
  
    ngOnInit() {}

    confirm() {
        this._stakeholder.remove(this.id, this.type)
            .subscribe(res => {
                this._toastr.success('El "stakeholder" ha sido eliminado!', 'Status 200', { timeOut: 5000 });
                this._bsModalRef.setDismissReason('true');
                this.bsModalRef.hide();
            },
            error => {
                this._error.errorHandler(error);
            });
    }
}
