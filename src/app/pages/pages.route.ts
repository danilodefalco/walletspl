import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PagesAppComponent } from './pages.app.component';
import { HomeComponent } from './home/home.component';
import { SendComponent } from './send/send.component';

const routerConfig: Routes = [
    {
        path: '', component: PagesAppComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'send', component: SendComponent }
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