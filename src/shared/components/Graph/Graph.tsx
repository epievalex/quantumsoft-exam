import React from "react";

import { Node } from "shared/components/Node";
import { treeManager } from "shared/utils/treeManager";

import { Tree, Node as NodeType, TreeType } from "shared/models/Tree";

import styles from "./Graph.module.css";

export interface IGraph {
  tree: Tree;
  treeType: TreeType;
  onNodeClick?: (node: NodeType, treeType: TreeType) => void;
  selectedNode: NodeType | null;
}

const Graph: React.FC<IGraph> = ({
  tree,
  treeType,
  selectedNode,
  onNodeClick,
}) => {
  const rootNodesIds = Object.keys(tree).filter(
    (nodeId) => !treeManager.isParentExistInHash(nodeId, tree)
  );

  return (
    <div className={styles.treeView}>
      {rootNodesIds.map((nodeId) => (
        <Node
          key={nodeId}
          nodeId={nodeId}
          tree={tree}
          treeType={treeType}
          onNodeClick={onNodeClick}
          selectedNode={selectedNode}
        />
      ))}
    </div>
  );
};

export default Graph;
