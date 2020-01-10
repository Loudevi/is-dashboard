import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { BrandService } from 'src/app/services/brand.service';

// Modals
import { BrandModalComponent } from '../modal/brand-modal.component';
import { DeleteModalComponent } from '../modal/delete-modal.component';

@Component({
    selector: 'app-brand',
    templateUrl: './brand.template.html',
    styleUrls: [ './brand.style.scss' ]
})

export class BrandComponent implements OnInit {

    data: any = [];

    brand: any = {};

    bsModalRef: BsModalRef;

    constructor(
        private _brand: BrandService,
        private _error: ErrorHandlerService,
        private _bsModalService: BsModalService
    ) {}

    ngOnInit() {
        this.refreshData();
    }

    refreshData() {
        this._brand.get(0)
            .subscribe(res => {
                this.data = res;
            },
            error => {
                this._error.errorHandler(error);
            })
    }

    newBrand() {
        this.brand.id = 0;
        this.bsModalRef = this._bsModalService.show(BrandModalComponent);
        this.bsModalRef.content.brand = this.brand;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }

    editBrand(brand) {
        this.bsModalRef = this._bsModalService.show(BrandModalComponent);
        this.bsModalRef.content.brand = brand;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }

    deleteBrand(id: any) {
        this.bsModalRef = this._bsModalService.show(DeleteModalComponent);
        this.bsModalRef.content.type = 'brand';
        this.bsModalRef.content.id = id;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }
}
