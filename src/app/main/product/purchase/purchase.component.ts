import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { MeasureService } from 'src/app/services/measure.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductTypeService } from 'src/app/services/product-type.service';

// Modals
import { DeleteModalComponent } from '../modal/delete-modal.component';
import { ProductModalComponent } from '../modal/product-modal.component';

@Component({
    selector: '[purchase]',
    styleUrls: [ './purchase.style.scss' ],
    templateUrl: './purchase.template.html'
})

export class PurchaseComponent implements OnInit {

    data: any = [];
    brands: any = [];
    categories: any = [];
    currencies: any = [];
    measures: any = [];
    productTypes: any = [];

    product: any = {};
    company: any = {};

    bsModalRef: BsModalRef;
    filteredName: string;
    filteredBrandId: number;
    filteredCategoryId: number;
    filteredProductTypeId: number;

    constructor(
        private _brand: BrandService,
        private _category: CategoryService,
        private _company: CompanyInfoService,
        private _currency: CurrencyService,
        private _measure: MeasureService,
        private _product: ProductService,
        private _productType: ProductTypeService,
        private _error: ErrorHandlerService,
        private _bsModalService: BsModalService
    ) {}

    ngOnInit() {
        this.refreshData();
        this.modalLists();
    }

    refreshData() {
        this._product.get(0, 'S')
            .subscribe(res => {
                this.data = res;
            },
            error => {
                this._error.errorHandler(error);
            });
    }

    modalLists() {
        this._brand.get(0)
            .subscribe(res => {
                this.brands = res;
            },
            error => {
                this._error.errorHandler(error);
            });
        this._category.get(0)
            .subscribe(res => {
                this.categories = res;
            },
            error => {
                this._error.errorHandler(error);
            });
        this._company.get(0, '0')
            .subscribe(res => {
                var companies = res;
                this.company = companies[0];
            },
            error => {
                this._error.errorHandler(error);
            });
        this._currency.get(0)
            .subscribe(res => {
                this.currencies = res;
            },
            error => {
                this._error.errorHandler(error);
            });
        this._measure.get(0)
            .subscribe(res => {
                this.measures = res;
            },
            error => {
                this._error.errorHandler(error);
            });
        this._productType.get(0)
            .subscribe(res => {
                this.productTypes = res;
            },
            error => {
                this._error.errorHandler(error);
            });
    }

    newProduct() {
        this.product.id = 0;
        this.product.movementType = 'P';
        this.product.taxType = 'T';
        this.product.customPrice = 'F';
        this.bsModalRef = this._bsModalService.show(ProductModalComponent);
        this.bsModalRef.content.product = this.product;
        this.bsModalRef.content.movementType = 'S';
        this.bsModalRef.content.brands = this.brands;
        this.bsModalRef.content.productTypes = this.productTypes;
        this.bsModalRef.content.measures = this.measures;
        this.bsModalRef.content.categories = this.categories;
        this.bsModalRef.content.companyInfo = this.company;
        this.bsModalRef.content.currencies = this.currencies;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                    this.product = {};
                }
            });
    }

    editProduct(product: any) {
        this.bsModalRef = this._bsModalService.show(ProductModalComponent);
        this.bsModalRef.content.product = product;
        this.bsModalRef.content.brands = this.brands;
        this.bsModalRef.content.productTypes = this.productTypes;
        this.bsModalRef.content.measures = this.measures;
        this.bsModalRef.content.categories = this.categories;
        this.bsModalRef.content.companyInfo = this.company;
        this.bsModalRef.content.currencies = this.currencies;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                    this.product = {};
                }
            });
    }

    deleteProduct(product) {
        this.bsModalRef = this._bsModalService.show(DeleteModalComponent);
        this.bsModalRef.content.type = 'product';
        this.bsModalRef.content.movementType = 'S';
        this.bsModalRef.content.id = product.id;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }
}
