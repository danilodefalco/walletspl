import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ngx-custom-validators';
import { TextMaskModule } from 'angular2-text-mask';

import { PagesAppComponent } from './pages.app.component';
import { PagesRoutingModule } from './pages.route';

import { NetworkCardComponent } from '../components/network-card/network-card.component';
import { AddressCardComponent } from '../components/address-card/address-card.component';
import { BalanceCardComponent } from '../components/balance-card/balance-card.component';

import { LoginInfoComponent } from './layout/login-info/login-info.component';
import { NavComponent } from './layout/nav/nav.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { SidebarService } from '../services/sidebar.service';
import { SendComponent } from './send/send.component';

@NgModule({
    declarations: [
        PagesAppComponent,
        LoginInfoComponent,
        NavComponent,
        SidebarComponent,
        NotFoundComponent,
        HomeComponent,
        NetworkCardComponent,
        AddressCardComponent,
        BalanceCardComponent,
        SendComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        PagesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        CustomFormsModule,
        TextMaskModule
    ],
    providers: [
        SidebarService
    ]
})
export class PagesModule { }