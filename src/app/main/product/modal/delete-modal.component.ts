import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { BrandService } from 'src/app/services/brand.service';
import { CategoryService } from 'src/app/services/category.service';
import { MeasureService } from 'src/app/services/measure.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
    selector: '[delete-modal]',
    templateUrl: './delete-modal.template.html',
    styleUrls: [ './delete-modal.style.scss' ]
})

export class DeleteModalComponent implements OnInit {
    
    type: string = null;
    movementType: string = null;
    id: any = null;

    constructor(
        private _brand: BrandService,
        private _category: CategoryService,
        private _measure: MeasureService,
        private _product: ProductService,
        private _error: ErrorHandlerService,
        private _toastr: ToastrService,
        private _bsModalRef: BsModalService,
        public bsModalRef: BsModalRef
    ) {}
  
    ngOnInit() {}

    confirm() {
        switch (this.type) {

            case 'brand': {
                this._brand.remove(this.id)
                    .subscribe(res => {
                        this._toastr.success('La marca ha sido eliminada!', 'Status 200', { timeOut: 5000 });
                        this._bsModalRef.setDismissReason('true');
                        this.bsModalRef.hide();
                    },
                    error => {
                        this._error.errorHandler(error);
                    });
                break;
            };

            case 'category': {
                this._category.remove(this.id)
                    .subscribe(res => {
                        this._toastr.success('La categoria ha sido eliminada!', 'Status 200', { timeOut: 5000 });
                        this._bsModalRef.setDismissReason('true');
                        this.bsModalRef.hide();
                    },
                    error => {
                        this._error.errorHandler(error);
                    });
                break;
            };

            case 'measure': {
                this._measure.remove(this.id)
                    .subscribe(res => {
                        this._toastr.success('La unidad de medida ha sido eliminada!', 'Status 200', { timeOut: 5000 });
                        this._bsModalRef.setDismissReason('true');
                        this.bsModalRef.hide();
                    },
                    error => {
                        this._error.errorHandler(error);
                    });
                break;
            };

            case 'product': {
                this._product.remove(this.id, this.movementType)
                    .subscribe(res => {
                        this._toastr.success('El producto ha sido eliminado!', 'Status 200', { timeOut: 5000 });
                        this._bsModalRef.setDismissReason('true');
                        this.bsModalRef.hide();
                    },
                    error => {
                        this._error.errorHandler(error);
                    });
                break;
            };
        };
    }
}
