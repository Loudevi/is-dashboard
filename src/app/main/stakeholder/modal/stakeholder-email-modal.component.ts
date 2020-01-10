import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { StakeholderEmailService } from 'src/app/services/stakeholder-email.service';

@Component({
    selector: '[stakeholder-email-modal]',
    templateUrl: './stakeholder-email-modal.template.html',
    styleUrls: ['stakeholder-email-modal.style.scss']
})

export class StakeholderEmailModalComponent implements OnInit {

    stakeholderType: string;
    stakeholderId: number;

    stakeholderEmail: any = {};
    
    data: any = [];

    constructor(
        private _stakeholderEmail: StakeholderEmailService,
        private _error: ErrorHandlerService,
        private _toastr: ToastrService,
        private _bsModalRef: BsModalService,
        public bsModalRef: BsModalRef
    ) {}
  
    ngOnInit() {}

    refreshData() {
        this._stakeholderEmail.get(0, this.stakeholderId)
            .subscribe(res => {
                this.data = res;
            },
            error => {
                this._error.errorHandler(error);
            })
    }

    insert() {
        this.stakeholderEmail.stakeholderId = this.stakeholderId;
        this._stakeholderEmail.insert(this.stakeholderEmail)
            .subscribe(res => {
                this._toastr.success('El correo electronico ha sido agregado de forma exitosa!', 'Status 200', { timeOut: 5000 });
                this.refreshData();
            },
            error => {
                this._error.errorHandler(error);
            });
    }
    
    delete(id: any) {
        this._stakeholderEmail.remove(id)
            .subscribe(res => {
                this._toastr.success('El correo electronico ha sido eliminado correctamente!', 'Status 200', { timeOut: 5000 });
                this.refreshData();
            },
            error => {
                this._error.errorHandler(error);
            });
    }
}
