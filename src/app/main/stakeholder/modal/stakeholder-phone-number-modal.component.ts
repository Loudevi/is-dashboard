import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { StakeholderPhoneNumberService } from 'src/app/services/stakeholder-phone-number.service';

@Component({
    selector: '[stakeholder-phone-number-modal]',
    templateUrl: './stakeholder-phone-number-modal.template.html',
    styleUrls: ['stakeholder-phone-number-modal.style.scss']
})

export class StakeholderPhoneNumberModalComponent implements OnInit {

    stakeholderType: string;
    stakeholderId: number;

    stakeholderPhoneNumber: any = {};
    
    data: any = [];

    constructor(
        private _stakeholderPhoneNumber: StakeholderPhoneNumberService,
        private _error: ErrorHandlerService,
        private _toastr: ToastrService,
        private _bsModalRef: BsModalService,
        public bsModalRef: BsModalRef
    ) {}
  
    ngOnInit() {}

    refreshData() {
        this._stakeholderPhoneNumber.get(0, this.stakeholderId)
            .subscribe(res => {
                this.data = res;
            },
            error => {
                this._error.errorHandler(error);
            })
    }

    insert() {
        this.stakeholderPhoneNumber.stakeholderId = this.stakeholderId;
        this._stakeholderPhoneNumber.insert(this.stakeholderPhoneNumber)
            .subscribe(res => {
                this._toastr.success('El numero de telefono ha sido agregado de forma exitosa!', 'Status 200', { timeOut: 5000 });
                this.refreshData();
            },
            error => {
                this._error.errorHandler(error);
            });
    }
    
    delete(id: any) {
        this._stakeholderPhoneNumber.remove(id)
            .subscribe(res => {
                this._toastr.success('El numero de telefono ha sido eliminado correctamente!', 'Status 200', { timeOut: 5000 });
                this.refreshData();
            },
            error => {
                this._error.errorHandler(error);
            });
    }
}
