import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { ProductTypeService } from 'src/app/services/product-type.service';

// Modals

@Component({
    selector: 'app-product-type',
    templateUrl: './product-type.template.html',
    styleUrls: [ './product-type.style.scss' ]
})

export class ProductTypeComponent implements OnInit {

    data: any = [];

    constructor(
        private _productType: ProductTypeService,
        private _error: ErrorHandlerService,
        private _bsModalService: BsModalService
    ) {}

    ngOnInit() {
        this.refreshData();
    }

    refreshData() {
        this._productType.get(0)
            .subscribe(res => {
                this.data = res;
            },
            error => {
                this._error.errorHandler(error);
            })
    }
}
