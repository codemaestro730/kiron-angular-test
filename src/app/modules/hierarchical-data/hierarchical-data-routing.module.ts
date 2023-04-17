
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HierarchicalDataComponent } from './hierarchical-data.component';

const routes: Routes = [
  {
    path: '',
    component: HierarchicalDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HierarchicalDataRoutingModule {}
