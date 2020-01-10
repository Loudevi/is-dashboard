import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { AuthService } from 'src/app/services/auth.service';

// Modals
import { DeleteModalComponent } from '../modal/delete-modal.component';
import { UserModalComponent } from '../modal/user-modal.component';

@Component({
    selector: 'app-user',
    templateUrl: './user.template.html',
    styleUrls: [ './user.style.scss' ]
})

export class UserComponent implements OnInit {

    data: any = [];

    bsModalRef: BsModalRef;
    filteredName: string;
    filteredLastName: string;
    filteredEmail: string;

    constructor(
        private _auth: AuthService,
        private _error: ErrorHandlerService,
        private _bsModalService: BsModalService
    ) {}

    ngOnInit() {
        this.refreshData();
    }

    refreshData() {
        var tenantId = this._auth.getUserTenant();
        this._auth.getUsers(tenantId)
            .subscribe(res => {
                this.data = res;
            },
            error => {
                this._error.errorHandler(error);
            });
    }

    newUser() {
        this.bsModalRef = this._bsModalService.show(UserModalComponent);
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if (reason == 'true') {
                    this.refreshData();
                }
            });
    }

    deleteUser(id: any) {
        this.bsModalRef = this._bsModalService.show(DeleteModalComponent);
        this.bsModalRef.content.type = 'user';
        this.bsModalRef.content.id = id;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }
}
