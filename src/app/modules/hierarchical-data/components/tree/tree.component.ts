import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface TreeNode {
  type: string;
  id: string;
  children?: TreeNode[];
  text?: string;
  src?: string;
  x?: string;
  y?: string;
  width?: string;
  scale?: string;
  repeatX?: string;
  fillStyle?: string;
  depth?: number;
  distance?: number;
  index?: number;
}

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent {
  @Input() node: TreeNode | undefined;
  @Output() nodeClick = new EventEmitter<TreeNode>();

  constructor() {}

  onNodeClick(node: TreeNode) {
    this.nodeClick.emit(node);
  }
}
