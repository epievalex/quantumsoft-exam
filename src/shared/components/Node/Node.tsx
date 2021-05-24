import React from "react";
import cn from "classnames";

import { treeManager } from "shared/utils/treeManager";

import { Tree, Node as NodeType, TreeType } from "shared/models/Tree";

import styles from "./Node.module.css";

export interface INode {
  nodeId: string;
  tree: Tree;
  treeType: TreeType;
  onNodeClick?: (node: NodeType, treeType: TreeType) => void;
  selectedNode: NodeType | null;
}

const Node: React.FC<INode> = ({
  selectedNode,
  treeType,
  nodeId,
  tree,
  onNodeClick,
}): JSX.Element | null => {
  const node = treeManager.getNode(nodeId, tree);
  if (!node) return null;
  return (
    <div key={nodeId} className={styles.node}>
      <p
        className={cn(styles.nodeInfo, {
          [styles.nodeInfo_selected]:
            node.data.id === selectedNode?.data.id &&
            selectedNode?.treeType === treeType,
        })}
        onClick={() => {
          if (onNodeClick) onNodeClick(node, treeType);
        }}
      >
        <span
          className={cn(styles.nodeValue, {
            [styles.nodeValue_deleted]: node.isDeleted,
          })}
        >
          {node.data.value}
        </span>
        {node.isDeleted && (
          <span className={styles.nodeInfo_deleted}>Deleted</span>
        )}
      </p>
      <div className={styles.children}>
        {node.children.map((childId) => (
          <Node
            key={childId}
            nodeId={childId}
            tree={tree}
            treeType={treeType}
            selectedNode={selectedNode}
            onNodeClick={onNodeClick}
          />
        ))}
      </div>
    </div>
  );
};

export default Node;
