import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Custom services
import { BrandService } from 'src/app/services/brand.service';

@Component({
    selector: '[brand-modal]',
    templateUrl: './brand-modal.template.html',
    styleUrls: [ './brand-modal.style.scss' ]
})

export class BrandModalComponent implements OnInit {

    brand: any = {};

    constructor(
        private _brand: BrandService,
        private _error: ErrorHandlerService,
        private _toastr: ToastrService,
        private _bsModalRef: BsModalService,
        public bsModalRef: BsModalRef ) {}
  
    ngOnInit() {}

    insert() {
        if(this.brand.id == 0) {
            this._brand.insert(this.brand)
                .subscribe(res => {
                    this._toastr.success('La marca ha sido creada de forma exitosa!', 'Status 200', { timeOut: 5000 });
                    this._bsModalRef.setDismissReason('true');
                    this.bsModalRef.hide();
                },
                error => {
                    this._error.errorHandler(error);
                });
        } else {
            this._brand.insert(this.brand)
                .subscribe(res => {
                    this._toastr.success('La marca ha sido actualizada de forma exitosa!', 'Status 200', { timeOut: 5000 });
                    this._bsModalRef.setDismissReason('true');
                    this.bsModalRef.hide();
                },
                error => {
                    this._error.errorHandler(error);
                });
        }
    }
}
