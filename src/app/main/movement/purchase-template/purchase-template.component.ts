import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ToastrService } from 'ngx-toastr';

// Services
import { CashRegisterService } from 'src/app/services/cash-register.service';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { CompleteDocumentService } from 'src/app/services/complete-document.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { DocumentTypeService } from 'src/app/services/document-type.service';
import { ExchangeRateService } from 'src/app/services/exchange-rate.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { ProductService } from 'src/app/services/product.service';
import { StakeholderService } from 'src/app/services/stakeholder.service';
import { WarehouseService } from 'src/app/services/warehouse.service';

// Modals

@Component({
    selector: '[purchase-template]',
    styleUrls: [ './purchase-template.style.scss' ],
    templateUrl: './purchase-template.template.html'
})

export class PurchaseTemplateComponent implements OnInit {

    products: any = [];
    stakeholders: any = [];
    inventories: any = [];
    documentDetails: any = [];
    documentTypes: any = [];
    cashRegisters: any = [];
    currencies: any = [];
    exchangeRates: any = [];
    warehouses: any = [];

    company: any = {};
    inventory: any = {};
    stakeholder: any = {};
    product: any = {};
    document: any = {};
    detail: any = {};
    documentTotal: any = {};
    completeDocument: any = {};
    documentType: any = {};

    index: any;
    currencyId: any = '';
    date: any;
    stock: number = 0;
    spinner: boolean = false;

    constructor(
        private _cashRegister: CashRegisterService,
        private _company: CompanyInfoService,
        private _completeDocument: CompleteDocumentService,
        private _currency: CurrencyService,
        private _documentType: DocumentTypeService,
        private _exchangeRate: ExchangeRateService,
        private _inventory: InventoryService,
        private _product: ProductService,
        private _stakeholder: StakeholderService,
        private _warehouse: WarehouseService,
        private _error: ErrorHandlerService,
        private _toastr: ToastrService
    ) {}

    ngOnInit() {
        this.refreshData();
    }

    refreshData() {
        this.date = new Date();
        var current = this.date.getMonth() + 1;

        this._product.get(0, 'S')
            .subscribe(res => {
                this.products = res;
            },
            error => {
                this._error.errorHandler(error);
            });

        this._documentType.get(0)
            .subscribe(res => {
                this.documentTypes = res;
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

        this._cashRegister.get(0)
            .subscribe(res => {
                this.cashRegisters = res;
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

        this._exchangeRate.get(0, current)
            .subscribe(res => {
                this.exchangeRates = res;
            },
            error => {
                this._error.errorHandler(error);
            });
        
        this._warehouse.get(0)
            .subscribe(res => {
                this.warehouses = res
            },
            error => {
                this._error.errorHandler(error);
            });

        // Initial payment option
        this.completeDocument.paidOnCreation = 'F';

        // Set initial index
        this.index = -1;

        // Set the document Total to 0
        this.documentTotal.totalPrice = 0;
        this.documentTotal.taxes = 0;
        this.documentTotal.totalBeforeTaxes = 0;
        this.documentTotal.discount = 0;
    }

    newDocument() {
        this.spinner = true;

        // Split the string for series and correlative
        var doc = "";
        var arr = [];
        doc = this.document.documentNumber;
        arr = doc.split('-');

        // Create the document JSON
        this.completeDocument.id = 0;
        this.document.id = 0;
        this.document.series = arr[0];
        this.document.correlative = arr[1];
        this.document.movementType = 'P';
        this.document.subTotal = this.documentTotal.totalBeforeTaxes;
        this.document.discount = this.documentTotal.discount;
        this.document.tax = this.documentTotal.taxes;
        this.document.total = this.documentTotal.totalPrice;
        this.document.balance = this.document.total;
        this.document.scanPdf = 'No Document Scan Yet!';
        this.document.xmlString = 'No XML String!'
        this.document.paidStatus = 'U';
        this.completeDocument.document = this.document;
        this.completeDocument.documentDetails = this.documentDetails;

        // Send File for saving
        this._completeDocument.insertManual(this.completeDocument)
            .subscribe(res => {
                this.spinner = false;
                this._toastr.success('La venta ha sido realizada de forma exitosa!', 'Status 200', { timeOut: 5000 });
                history.back();
            },
            error => {
                this.spinner = false;
                this._error.errorHandler(error);
            });
    }

    addProductDetail() {
        this.detail.id = 0;
        this.detail.productName = this.product.name;
        this.detail.totalPrice = (this.detail.price * this.detail.qty).toFixed(2);
        this.detail.customPrice = this.product.customPrice;
        this.detail.productTypeId = this.product.productTypeId;
        this.priceCalculation();
        this.calculateDocumentTotals(this.detail);
        this.addToProductList();        
    }

    stakeholderChange() {
        this._stakeholder.get(0, this.stakeholder.idDocument, 'P')
            .subscribe(res => {
                this.stakeholders = res;
                if(this.stakeholders.length != 0) {
                    this.stakeholder = this.stakeholders[0];
                    this.document.stakeholderId = this.stakeholder.id;
                } else {
                    this._toastr.warning('No existe el cliente en la base de datos!', 'Status 404', { timeOut: 5000 });
                }
            },
            error => {
                this._error.errorHandler(error);
            });
    }

    onProductChange() {
        this.product = this.products.find(x => x.id == this.detail.productId);
        this.detail.price = this.product.price;
        this.detail.productTypeId = this.product.productTypeId;
        this.detail.qty = 1;
        if(this.product.productTypeId == 1) {
            this._inventory.get(0, this.product.id, this.document.warehouseId)
                .subscribe(res => {
                    this.inventories = res;
                    if(this.inventories.length != 0) {
                        this.inventory = this.inventories[0];
                        this.stock = this.inventory.qtyOnHand;
                        this.detail.cost = this.inventories.costAverage;
                    } else {
                        this.detail.cost = this.product.price;
                    }
                });
        } else {
            this.detail.cost = 0;
        }
    }

    priceCalculation() {
        if(this.product.customPrice == 'T') {
            if(this.product.taxType == 'T' && this.documentType.docId < 40) {
                this.detail.priceBeforeTaxes = (this.detail.price / (1 + this.company.taxFee)).toFixed(2);
                this.detail.tax = this.detail.price - this.detail.priceBeforeTaxes;
                this.detail.discount = 0;
            } else {
                this.detail.priceBeforeTaxes = this.detail.price;
                this.detail.tax = 0;
                this.detail.discount = 0;
            }
        } else {
            if(this.product.taxType == 'T' && this.documentType.docId < 40) {
                this.detail.discount = this.product.price - this.detail.price;
                this.detail.priceBeforeTaxes = (this.detail.price / (1 + this.company.taxFee)).toFixed(2);
                this.detail.tax = this.detail.price - this.detail.priceBeforeTaxes;
            } else {
                this.detail.discount = this.product.price - this.detail.price;
                this.detail.priceBeforeTaxes = this.detail.price;
                this.detail.tax = 0;
            }
        }
    }

    calculateDocumentTotals(detail) {
        if(this.documentTotal.totalPrice == 0) {
            this.documentTotal.totalBeforeTaxes = (parseFloat(detail.priceBeforeTaxes) * parseFloat(detail.qty)).toFixed(2);
            this.documentTotal.taxes = (parseFloat(detail.tax) * parseFloat(detail.qty)).toFixed(2);
            this.documentTotal.totalPrice = parseFloat(detail.totalPrice).toFixed(2);
        } else {
            this.documentTotal.totalBeforeTaxes = (parseFloat(this.documentTotal.totalBeforeTaxes) + (parseFloat(detail.priceBeforeTaxes) * parseFloat(detail.qty))).toFixed(2);
            this.documentTotal.taxes = (parseFloat(this.documentTotal.taxes) + (parseFloat(detail.tax) * parseFloat(detail.qty))).toFixed(2);
            this.documentTotal.totalPrice = (parseFloat(this.documentTotal.totalPrice) + parseFloat(detail.totalPrice)).toFixed(2);
        }
    }

    addToProductList() {
        if(this.detail.customPrice == 'T') {
            this.documentDetails.push(this.detail);
            this.detail = {};
        } else {
            this.index = this.documentDetails.findIndex(d => d.productId == this.detail.productId);
            if(this.index != -1) {
                this.documentDetails[this.index].qty = this.documentDetails[this.index].qty + this.detail.qty;
                this.documentDetails[this.index].totalPrice = this.documentDetails[this.index].totalPrice + this.detail.totalPrice;
                this.documentDetails[this.index].discount = this.documentDetails[this.index].discount + this.detail.discount;
            } else {
                this.documentDetails.push(this.detail);
                this.detail = {};
            }
        }
    }

    paymentChange($event) {
        if($event.target.checked) {
            this.completeDocument.paidOnCreation = 'T'
        } else {
            this.completeDocument.paidOnCreation = 'F'
        }
    }

    currencyChange() {
        this.currencyId = this.document.currencyId;
        if (this.document.currencyId == 1) {
            this.document.exchangeRate = 1;
        } else {
            var result = this.exchangeRates.find(x => x.rateDate.substr(8, 2) == this.date.getDate().toString());
            this.document.exchangeRate = result.sellRate;
        }
    }

    onDateChange() {
        this.date = this.document.date;
        var month = this.date.substr(5, 2);

        this._exchangeRate.get(0, month)
            .subscribe(res => {
                this.exchangeRates = res;
                if (this.document.documentCurrencyId == 1) {
                    this.document.exchangeRate = 1;
                } else {
                    var result = this.exchangeRates.find(x => x.rateDate.substr(8, 2) == this.date.substr(8, 2));
                    this.document.exchangeRate = result.sellRate;
                }
            });
    }

    onDocumentTypeChange() {
        var index = this.documentTypes.findIndex(d => d.id == this.document.documentTypeId);
        this.documentType = this.documentTypes[index];
    }

    onDiscountChange() {
        this.documentTotal.totalPrice = (this.documentTotal.totalPrice - this.documentTotal.discount).toFixed(2);
        this.documentTotal.totalBeforeTaxes = (this.documentTotal.totalPrice / (1 + this.company.taxFee)).toFixed(2);
        this.documentTotal.taxes = (this.documentTotal.totalPrice - this.documentTotal.totalBeforeTaxes).toFixed(2);
    }
}
