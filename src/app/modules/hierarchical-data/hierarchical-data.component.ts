import { Component, OnInit } from '@angular/core';
import data from './data/scene-manager.json';
import { TreeNode } from './components/tree/tree.component';

@Component({
  selector: 'app-hierarchical-data',
  templateUrl: './hierarchical-data.component.html',
  styleUrls: ['./hierarchical-data.component.css'],
})
export class HierarchicalDataComponent implements OnInit {
  treeData?: TreeNode;
  selectedNode?: TreeNode;
  constructor() {}

  ngOnInit(): void {
    this.treeData = data as TreeNode;
  }

  get treeInformation() {
    if (this.selectedNode) {
      return Object.entries(this.selectedNode).filter(([key]) => key !== 'children');
    }

    return undefined;
  }
}
