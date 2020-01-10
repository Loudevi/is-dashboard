import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

// Services
import { CategoryService } from 'src/app/services/category.service';

// Modals
import { CategoryModalComponent } from '../modal/category-modal.component';
import { DeleteModalComponent } from '../modal/delete-modal.component';

@Component({
    selector: 'app-category',
    templateUrl: './category.template.html',
    styleUrls: [ './category.style.scss' ]
})

export class CategoryComponent implements OnInit {

    data: any = [];

    category: any = {};

    bsModalRef: BsModalRef;

    constructor(
        private _category: CategoryService,
        private _error: ErrorHandlerService,
        private _bsModalService: BsModalService
    ) {}

    ngOnInit() {
        this.refreshData();
    }

    refreshData() {
        this._category.get(0)
            .subscribe(res => {
                this.data = res;
            },
            error => {
                this._error.errorHandler(error);
            })
    }

    newCategory() {
        this.category.id = 0;
        this.bsModalRef = this._bsModalService.show(CategoryModalComponent);
        this.bsModalRef.content.category = this.category;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }

    editCategory(category) {
        this.bsModalRef = this._bsModalService.show(CategoryModalComponent);
        this.bsModalRef.content.category = category;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }

    deleteCategory(id: any) {
        this.bsModalRef = this._bsModalService.show(DeleteModalComponent);
        this.bsModalRef.content.type = 'category';
        this.bsModalRef.content.id = id;
        this._bsModalService.onHide
            .subscribe((reason: string) => {
                if(reason == 'true') {
                    this.refreshData();
                }
            });
    }
}
