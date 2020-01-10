import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { DocumentTypeModalComponent } from '../modal/document-type-modal.component';
import { DeleteModalComponent } from '../modal/delete-modal.component';

// Modals

@Component({
    selector: 'app-document-type',
    templateUrl: './document-type.template.html',
    styleUrls: [ './document-type.style.scss' ]
})

export class DocumentTypeComponent implements OnInit {

    data: any = [];

    documentType: any = {};

    bsModalRef: BsModalRef;

    constructor(
        private _documentType: DocumentTypeService,
        private _error: ErrorHandlerService,
        private _bsModalService: BsModalService
    ) {}

    ngOnInit() {
        this.refreshData();
    }

    refreshData() {
        this._documentType.get(0)
            .subscribe(res => {
                this.data = res;
            },
            error => {
                this._error.errorHandler(error);
            })
    }

    newDocumentType() {
        this.documentType.id = 0;
        this.bsModalRef = this._bsModalService.show(DocumentTypeModalComponent);
        this.bsModalRef.content.documentType = this.documentType;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }

    editDocumentType(documentType) {
        this.bsModalRef = this._bsModalService.show(DocumentTypeModalComponent);
        this.bsModalRef.content.documentType = documentType;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }

    deleteDocumentType(id: any) {
        this.bsModalRef = this._bsModalService.show(DeleteModalComponent);
        this.bsModalRef.content.type = 'document-type';
        this.bsModalRef.content.id = id;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }
}
