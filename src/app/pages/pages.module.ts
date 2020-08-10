import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ngx-custom-validators';
import { TextMaskModule } from 'angular2-text-mask';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxSpinnerModule } from "ngx-spinner";

import { PagesAppComponent } from './pages.app.component';
import { PagesRoutingModule } from './pages.route';

import { TokenListComponent } from '../components/token-list/token-list.component';

import { LoginInfoComponent } from './layout/login-info/login-info.component';
import { NavComponent } from './layout/nav/nav.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { SidebarService } from '../services/sidebar.service';
import { TokenDetailsComponent } from './token-details/token-details.component';
import { TokenAddComponent } from './token-add/token-add.component';
import { TokenSendComponent } from './token-send/token-send.component';
import { TransactionListComponent } from '../components/transaction-list/transaction-list.component';
import { WalletDetailsComponent } from './wallet-details/wallet-details.component';

@NgModule({
    declarations: [
        PagesAppComponent,
        LoginInfoComponent,
        NavComponent,
        SidebarComponent,
        NotFoundComponent,
        HomeComponent,
        TokenListComponent,
        TokenDetailsComponent,
        TokenAddComponent,
        TokenSendComponent,
        TransactionListComponent,
        WalletDetailsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        PagesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        CustomFormsModule,
        TextMaskModule,
        QRCodeModule,
        NgxSpinnerModule
    ],
    providers: [
        SidebarService
    ]
})
export class PagesModule { }