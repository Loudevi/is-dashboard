import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { IdDocumentTypeService } from 'src/app/services/id-document-type.service';
import { StakeholderService } from 'src/app/services/stakeholder.service';
import { StakeholderEmailService } from 'src/app/services/stakeholder-email.service';
import { StakeholderPhoneNumberService } from 'src/app/services/stakeholder-phone-number.service';

// Modals
import { DeleteModalComponent } from '../modal/delete-modal.component';
import { StakeholderModalComponent } from '../modal/stakeholder-modal.component';
import { StakeholderEmailModalComponent } from '../modal/stakeholder-email-modal.component';
import { StakeholderPhoneNumberModalComponent } from '../modal/stakeholder-phone-number-modal.component';

@Component({
    selector: '[client]',
    styleUrls: [ './client.style.scss' ],
    templateUrl: './client.template.html'
})

export class ClientComponent implements OnInit {

    data: any = [];
    idDocumentTypes: any = [];
    stakeholderData: any = [];

    stakeholder: any = {};

    bsModalRef: BsModalRef;
    filteredIdDocument: string;
    filteredIdDocumentTypeId: number;
    filteredName: string;

    constructor(
        private _idDocumentType: IdDocumentTypeService,
        private _stakeholder: StakeholderService,
        private _stakeholderEmail: StakeholderEmailService,
        private _stakeholderPhoneNumber: StakeholderPhoneNumberService,
        private _error: ErrorHandlerService,
        private _bsModalService: BsModalService
    ) {}

    ngOnInit() {
        this.refreshData();
    }

    refreshData() {
        this._stakeholder.get(0, 0, 'S')
            .subscribe(res => {
                this.data = res;
            },
            error => {
                this._error.errorHandler(error);
            });
        this._idDocumentType.get(0)
            .subscribe(res => {
                this.idDocumentTypes = res;
            },
            error => {
                this._error.errorHandler(error);
            });
    }

    newStakeholder() {
        this.stakeholder.id = 0;
        this.stakeholder.stakeholderType = 'C';
        this.bsModalRef = this._bsModalService.show(StakeholderModalComponent);
        this.bsModalRef.content.stakeholder = this.stakeholder;
        this.bsModalRef.content.stakeholderType = 'C';
        this.bsModalRef.content.idDocumentTypes = this.idDocumentTypes;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }

    editStakeholder(stakeholder: any) {
        this.bsModalRef = this._bsModalService.show(StakeholderModalComponent);
        this.bsModalRef.content.stakeholder = stakeholder;
        this.bsModalRef.content.stakeholderType = 'C';
        this.bsModalRef.content.idDocumentTypes = this.idDocumentTypes;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }

    deleteStakeholder(id: any) {
        this.bsModalRef = this._bsModalService.show(DeleteModalComponent);
        this.bsModalRef.content.type = 'S';
        this.bsModalRef.content.id = id;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }

    editStakeholderEmails(stakeholder: any) {
        this._stakeholderEmail.get(0, stakeholder.id)
            .subscribe(res => {
                this.stakeholderData = res;
                this.bsModalRef = this._bsModalService.show(StakeholderEmailModalComponent);
                this.bsModalRef.content.stakeholderId = stakeholder.id;
                this.bsModalRef.content.stakeholderType = stakeholder.stakeholderType;
                this.bsModalRef.content.data = this.stakeholderData;
            },
            error => {
                this._error.errorHandler(error);
            })
    }

    editStakeholderPhoneNumbers(stakeholder: any) {
        this._stakeholderPhoneNumber.get(0, stakeholder.id)
            .subscribe(res => {
                this.stakeholderData = res;
                this.bsModalRef = this._bsModalService.show(StakeholderPhoneNumberModalComponent);
                this.bsModalRef.content.stakeholderId = stakeholder.id;
                this.bsModalRef.content.stakeholderType = stakeholder.stakeholderType;
                this.bsModalRef.content.data = this.stakeholderData;
            },
            error => {
                this._error.errorHandler(error);
            })
    }
}
