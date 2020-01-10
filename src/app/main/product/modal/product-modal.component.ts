import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Custom services
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: '[product-modal]',
    templateUrl: './product-modal.template.html',
    styleUrls: [ './product-modal.style.scss' ]
})

export class ProductModalComponent implements OnInit {

    product: any = {};
    companyInfo: any = {};

    brands: any = [];
    categories: any = [];
    productTypes: any = [];
    measures: any = [];
    currencies: any = [];

    movementType: string;

    constructor(
        private _product: ProductService,
        private _error: ErrorHandlerService,
        private _toastr: ToastrService,
        private _bsModalRef: BsModalService,
        public bsModalRef: BsModalRef ) {}
  
    ngOnInit() {}

    insert() {
        if(this.product.id == 0) {
            this._product.insert(this.product)
                .subscribe(res => {
                    this._toastr.success('El producto ha sido creado de forma exitosa!', 'Status 200', { timeOut: 5000 });
                    this._bsModalRef.setDismissReason('true');
                    this.bsModalRef.hide();
                },
                error => {
                    this._error.errorHandler(error);
                });
        } else {
            this._product.insert(this.product)
                .subscribe(res => {
                    this._toastr.success('El producto ha sido actualizado de forma exitosa!', 'Status 200', { timeOut: 5000 });
                    this._bsModalRef.setDismissReason('true');
                    this.bsModalRef.hide();
                },
                error => {
                    this._error.errorHandler(error);
                });
        }
    }

    movementTypeChange($event) {
        if($event.target.checked) {
            this.product.movementType = 'B'
        } else {
            this.product.movementType = this.movementType;
        }
    }

    customPriceChange($event) {
        if($event.target.checked) {
            this.product.customPrice = 'T';
        } else {
            this.product.customPrice = 'F';
        }
    }

    taxTypeChange($event) {
        if($event.target.checked) {
            this.product.taxType = 'E';
            if(this.product.price != null) {
                this.onPriceBeforeTaxesChange();
            }
        } else {
            this.product.taxType = 'T';
            if(this.product.price != null) {
                this.onPriceBeforeTaxesChange();
            }
        }
    }

    onPriceBeforeTaxesChange() {
        if(this.product.taxType == 'T') {
            this.product.price = (this.product.priceBeforeTaxes * (1 + this.companyInfo.taxFee)).toFixed(2);
            this.product.tax = (this.product.price - this.product.priceBeforeTaxes).toFixed(2);
        } else {
            this.product.price = this.product.priceBeforeTaxes;
            this.product.tax = 0;
        }

    }

    onPriceChange() {
        if(this.product.taxType == 'T') {
            this.product.priceBeforeTaxes = (this.product.price / (1 + this.companyInfo.taxFee)).toFixed(2);
            this.product.tax = (this.product.price - this.product.priceBeforeTaxes).toFixed(2);
        } else {
            this.product.priceBeforeTaxes = this.product.price;
            this.product.tax = 0;
        }
    }
}
