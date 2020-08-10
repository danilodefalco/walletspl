import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesAppComponent } from './pages.app.component';
import { HomeComponent } from './home/home.component';
import { TokenDetailsComponent } from './token-details/token-details.component';
import { TokenAddComponent } from './token-add/token-add.component';
import { TokenResolve } from '../resolves/token.resolve';
import { TokenSendComponent } from './token-send/token-send.component';
import { WalletDetailsComponent } from './wallet-details/wallet-details.component';

const routerConfig: Routes = [
    {
        path: '', component: PagesAppComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'token-add', component: TokenAddComponent },
            { path: 'token-details/:id', component: TokenDetailsComponent, resolve: { token: TokenResolve } },
            { path: 'token-send/:id', component: TokenSendComponent },
            { path: 'wallet-details', component: WalletDetailsComponent }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig)
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule { }