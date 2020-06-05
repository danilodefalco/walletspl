import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/accounts/signin', pathMatch: 'full' },
  {
    path: 'accounts',
    loadChildren: () =>
      import('./accounts/account.module')
        .then(a => a.AccountModule)
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages.module')
        .then(a => a.PagesModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
