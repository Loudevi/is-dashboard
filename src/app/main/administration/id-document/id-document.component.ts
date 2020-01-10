import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { IdDocumentTypeService } from 'src/app/services/id-document-type.service';

// Modals
import { DeleteModalComponent } from '../modal/delete-modal.component';
import { IdDocumentTypeModalComponent } from '../modal/id-document-type-modal.component';

@Component({
    selector: 'app-id-document',
    templateUrl: './id-document.template.html',
    styleUrls: [ './id-document.style.scss' ]
})

export class IdDocumentComponent implements OnInit {

    data: any = [];

    idDocument: any = {};

    bsModalRef: BsModalRef;

    constructor(
        private _idDocument: IdDocumentTypeService,
        private _error: ErrorHandlerService,
        private _bsModalService: BsModalService
    ) {}

    ngOnInit() {
        this.refreshData();
    }

    refreshData() {
        this._idDocument.get(0)
            .subscribe(res => {
                this.data = res;
            },
            error => {
                this._error.errorHandler(error);
            })
    }

    newIdDocument() {
        this.idDocument.id = 0;
        this.bsModalRef = this._bsModalService.show(IdDocumentTypeModalComponent);
        this.bsModalRef.content.idDocumentType = this.idDocument;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if (reason == 'true') {
                    this.refreshData();
                }
            });
    }

    editIdDocument(idDocument: any) {
        this.bsModalRef = this._bsModalService.show(IdDocumentTypeModalComponent);
        this.bsModalRef.content.idDocumentType = idDocument;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if (reason == 'true') {
                    this.refreshData();
                }
            });
    }

    deleteIdDocument(id: any) {
        this.bsModalRef = this._bsModalService.show(DeleteModalComponent);
        this.bsModalRef.content.type = 'id-document';
        this.bsModalRef.content.id = id;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }
}
