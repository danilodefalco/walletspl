import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AccountModule } from './accounts/account.module';
import { PagesModule } from './pages/pages.module';

import { SecurityService } from './services/security.service';
import { WalletService } from './services/wallet.service';
import { StorageService } from './services/storage.service';
import { SigninService } from './services/signin.service';
import { TokenResolve } from './resolves/token.resolve';

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
    AccountModule,
    PagesModule
  ],
  providers: [
    WalletService,
    StorageService,
    SigninService,
    SecurityService,
    TokenResolve
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
