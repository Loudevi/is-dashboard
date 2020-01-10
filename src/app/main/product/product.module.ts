import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { RouterModule } from '@angular/router';

// Components
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { MeasureComponent } from './measure/measure.component';
import { ProductTypeComponent } from './product-type/product-type.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SaleComponent } from './sale/sale.component';

// Modals
import { BrandModalComponent } from './modal/brand-modal.component';
import { CategoryModalComponent } from './modal/category-modal.component';
import { DeleteModalComponent } from './modal/delete-modal.component';
import { MeasureModalComponent } from './modal/measure-modal.component';
import { ProductModalComponent } from './modal/product-modal.component';

// Pipes
import { BrandFilterPipe } from './pipe/brand-filter.pipe';
import { CategoryFilterPipe } from './pipe/category-filter.pipe';
import { NameFilterPipe } from './pipe/name-filter.pipe';
import { ProductTypeFilterPipe } from './pipe/product-type-filter.pipe';

export const routes = [
    { path: 'brand', component: BrandComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'measure', component: MeasureComponent },
    { path: 'product-type', component: ProductTypeComponent },
    { path: 'purchase', component: PurchaseComponent },
    { path: 'sale', component: SaleComponent },
];

@NgModule({
    declarations: [
        BrandComponent,
        CategoryComponent,
        MeasureComponent,
        ProductTypeComponent,
        PurchaseComponent,
        SaleComponent,
        BrandModalComponent,
        CategoryModalComponent,
        DeleteModalComponent,
        MeasureModalComponent,
        ProductModalComponent,
        BrandFilterPipe,
        CategoryFilterPipe,
        NameFilterPipe,
        ProductTypeFilterPipe
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        FormsModule,
        ModalModule.forRoot(),
        TooltipModule,
        RouterModule.forChild(routes),
    ],
    entryComponents: [
        BrandModalComponent,
        CategoryModalComponent,
        DeleteModalComponent,
        MeasureModalComponent,
        ProductModalComponent
    ]
})
export class ProductModule {
    static routes = routes;
}
