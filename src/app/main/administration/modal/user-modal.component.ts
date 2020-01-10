import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

// Services
import { AuthService } from '../../../services/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Component({
  selector: '[user-modal]',
  templateUrl: './user-modal.template.html',
  styleUrls: [ './user-modal.style.scss' ]
})

export class UserModalComponent implements OnInit {

    user: any = {};

    constructor(
        private _auth: AuthService,
        private _error: ErrorHandlerService,
        private _toastr: ToastrService,
        private _bsModalRef: BsModalService,
        public bsModalRef: BsModalRef
    ) {}
    
    ngOnInit() {}

    createUser() {
        this.user.tenantId = this._auth.getUserTenant();
        this._auth.createUser(this.user)
            .subscribe(res => {
                this._toastr.success('El registro se ha guardado de forma exitosa!', 'Status 200', { timeOut: 5000 });
                this._bsModalRef.setDismissReason('true');
                this.bsModalRef.hide();
            },
            error => {
                this._error.errorHandler(error);
            });
    }
}
