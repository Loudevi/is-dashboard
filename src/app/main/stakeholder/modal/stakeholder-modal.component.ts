import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { StakeholderService } from 'src/app/services/stakeholder.service';

@Component({
    selector: '[stakeholder-modal]',
    templateUrl: './stakeholder-modal.template.html',
    styleUrls: ['stakeholder-modal.style.scss']
})

export class StakeholderModalComponent implements OnInit {

    stakeholderType: string;

    stakeholder: any = {};
    
    idDocumentTypes: any = [];

    constructor(
        private _stakeholder: StakeholderService,
        private _error: ErrorHandlerService,
        private _toastr: ToastrService,
        private _bsModalRef: BsModalService,
        public bsModalRef: BsModalRef
    ) {}
  
    ngOnInit() {}

    insert() {
        if(this.stakeholder.id == 0) {
            this._stakeholder.insert(this.stakeholder)
                .subscribe(res => {
                    this._toastr.success('El "stakeholder" ha sido creado de forma exitosa!', 'Status 200', { timeOut: 5000 });
                    this._bsModalRef.setDismissReason('true');
                    this.bsModalRef.hide();
                },
                error => {
                    this._error.errorHandler(error);
                });
        } else {
            this._stakeholder.insert(this.stakeholder)
                .subscribe(res => {
                    this._toastr.success('El "stakeholder" ha sido actualizado de forma exitosa!', 'Status 200', { timeOut: 5000 });
                    this._bsModalRef.setDismissReason('true');
                    this.bsModalRef.hide();
                },
                error => {
                    this._error.errorHandler(error);
                });
        }
    }
    
    stakeholderTypeChange($event) {
        if($event.target.checked) {
            this.stakeholder.stakeholderType = 'B'
        } else {
            this.stakeholder.stakeholderType = this.stakeholderType;
        }
    }
}
