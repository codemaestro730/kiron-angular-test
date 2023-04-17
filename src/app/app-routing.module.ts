import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/football', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'football',
        loadChildren: () => import('./modules/football/football.module').then((m) => m.FootballModule),
      },
      {
        path: 'hierarchical',
        loadChildren: () =>
          import('./modules/hierarchical-data/hierarchical-data.module').then(
            (m) => m.HierarchicalDataModule,
          ),
      },
      {
        path: 'api-call',
        loadChildren: () => import('./modules/api-call/api-call.module').then((m) => m.ApiCallModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/football',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
