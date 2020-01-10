import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Custom services
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: '[category-modal]',
    templateUrl: './category-modal.template.html',
    styleUrls: [ './category-modal.style.scss' ]
})

export class CategoryModalComponent implements OnInit {

    category: any = {};

    constructor(
        private _category: CategoryService,
        private _error: ErrorHandlerService,
        private _toastr: ToastrService,
        private _bsModalRef: BsModalService,
        public bsModalRef: BsModalRef ) {}
  
    ngOnInit() {}

    insert() {
        if(this.category.id == 0) {
            this._category.insert(this.category)
                .subscribe(res => {
                    this._toastr.success('La categoria ha sido creada de forma exitosa!', 'Status 200', { timeOut: 5000 });
                    this._bsModalRef.setDismissReason('true');
                    this.bsModalRef.hide();
                },
                error => {
                    this._error.errorHandler(error);
                });
        } else {
            this._category.insert(this.category)
                .subscribe(res => {
                    this._toastr.success('La categoria ha sido actualizada de forma exitosa!', 'Status 200', { timeOut: 5000 });
                    this._bsModalRef.setDismissReason('true');
                    this.bsModalRef.hide();
                },
                error => {
                    this._error.errorHandler(error);
                });
        }
    }
}
