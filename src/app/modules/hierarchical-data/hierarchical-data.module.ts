import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HierarchicalDataComponent } from './hierarchical-data.component';
import { HierarchicalDataRoutingModule } from './hierarchical-data-routing.module';
import { TreeComponent } from './components/tree/tree.component';

@NgModule({
  declarations: [HierarchicalDataComponent, TreeComponent],
  imports: [CommonModule, HierarchicalDataRoutingModule],
})
export class HierarchicalDataModule {}
