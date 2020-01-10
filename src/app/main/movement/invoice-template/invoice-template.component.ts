import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { DocumentService } from 'src/app/services/document.service';
import { DocumentDetailService } from 'src/app/services/document-detail.service';
import { CompanyInfoService } from 'src/app/services/company-info.service';

// Modals

@Component({
    selector: '[invoice-template]',
    styleUrls: [ './invoice-template.style.scss' ],
    templateUrl: './invoice-template.template.html'
})

export class InvoiceTemplateComponent implements OnInit {

    details: any = [];

    document:any = {};
    company: any = {};

    documentId: any;

    constructor(
        private _companyInfo: CompanyInfoService,
        private _document: DocumentService,
        private _documentDetail: DocumentDetailService,
        private _error: ErrorHandlerService,
        private _activated: ActivatedRoute,
    ) {
        _activated.params
            .subscribe(p => {
                this.documentId = +p['id'];
            });
    }

    ngOnInit() {
        this.refreshData();
    }

    refreshData() {
        this._document.get(this.documentId, '0')
            .subscribe(res => {
                var documents = res;
                this.document = documents[0];
            },
            error => {
                this._error.errorHandler(error);
            });
        this._companyInfo.get(0, '0')
            .subscribe(res => {
                var companies = res;
                this.company = companies[0];
            },
            error => {
                this._error.errorHandler(error);
            });
        this._documentDetail.get(0, this.documentId)
            .subscribe(res => {
                this.details = res;
            },
            error => {
                this._error.errorHandler(error);
            });
    }
}
