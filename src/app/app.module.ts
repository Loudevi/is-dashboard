// Modules
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ToastrModule } from 'ngx-toastr';

// Components
import { AppComponent } from './app.component';

// Services
import { AuthService } from './services/auth.service';
import { BrandService } from './services/brand.service';
import { CashRegisterService } from './services/cash-register.service';
import { CashTransactionService } from './services/cash-transaction.service';
import { CategoryService } from './services/category.service';
import { CompanyInfoService } from './services/company-info.service';
import { CompleteDocumentService } from './services/complete-document.service';
import { CurrencyService } from './services/currency.service';
import { DocumentService } from './services/document.service';
import { DocumentDetailService } from './services/document-detail.service';
import { DocumentTypeService } from './services/document-type.service';
import { ErrorHandlerService } from './services/error-handler.service';
import { ExchangeRateService } from './services/exchange-rate.service';
import { IdDocumentTypeService } from './services/id-document-type.service';
import { InventoryService } from './services/inventory.service';
import { MeasureService } from './services/measure.service';
import { ProductService } from './services/product.service';
import { ProductTypeService } from './services/product-type.service';
import { StakeholderService } from './services/stakeholder.service';
import { StakeholderEmailService } from './services/stakeholder-email.service';
import { StakeholderPhoneNumberService } from './services/stakeholder-phone-number.service';
import { WarehouseService } from './services/warehouse.service';

// Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/pro-regular-svg-icons';
import { fad } from '@fortawesome/pro-duotone-svg-icons';
import { fas } from '@fortawesome/pro-solid-svg-icons';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        FormsModule,
        HttpClientModule,
        ModalModule.forRoot(),
        TooltipModule.forRoot(),
        ToastrModule.forRoot()
    ],
    providers: [
        AuthService,
        BrandService,
        CashRegisterService,
        CashTransactionService,
        CategoryService,
        CompanyInfoService,
        CompleteDocumentService,
        CurrencyService,
        DocumentService,
        DocumentDetailService,
        DocumentTypeService,
        ErrorHandlerService,
        ExchangeRateService,
        IdDocumentTypeService,
        InventoryService,
        MeasureService,
        ProductService,
        ProductTypeService,
        StakeholderService,
        StakeholderEmailService,
        StakeholderPhoneNumberService,
        WarehouseService
    ],
    bootstrap: [
        AppComponent
    ],
    schemas: []
})

export class AppModule {
    constructor() {
        library.add( far, fad, fas );
    }
}
