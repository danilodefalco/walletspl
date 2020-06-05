import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AccountModule } from './accounts/account.module';
import { PagesModule } from './pages/pages.module';

import { SecurityService } from './services/security.service';
import { WalletService } from './services/wallet.service';
import { StorageService } from './services/storage.service';
import { SigninService } from './services/signin.service';
import { SmartContractService } from './services/smart-contract.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    AccountModule,
    PagesModule
  ],
  providers: [
    WalletService,
    StorageService,
    SigninService,
    SecurityService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
