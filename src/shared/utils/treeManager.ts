import { NodeParent, Tree, Node } from "shared/models/Tree";
import { OperationQueueItem } from "store/nodeTransfer/types";

export interface IChangeNodeValue {
  nodeId: string;
  value: string;
  tree: Tree;
}

export interface ITransferNode {
  fromTree: Tree;
  toTree: Tree;
  nodeId: string;
}

export interface IDeleteNode {
  nodeId: string;
  tree: Tree;
}

export interface ICreateNode {
  parentId: NodeParent;
  idForNewNode: string;
  tree: Tree;
}

export interface IExecuteQueueOfOperations {
  queue: OperationQueueItem[];
  tree: Tree;
}

const getNode = (nodeId: string | null, tree: Tree): Node | undefined => {
  return nodeId !== null ? tree[nodeId] : undefined;
};

const isParentExistInHash = (nodeId: string, tree: Tree): boolean => {
  const node = getNode(nodeId, tree);
  if (!node || !node.parent) return false;
  const parentNode = tree[node.parent];
  return Boolean(parentNode);
};

const shouldNodeBeDeletedInNewTree = (node: Node, newTreeForNode: Tree) => {
  if (!node || !node.parent) return false;
  const parentNode = newTreeForNode[node.parent];
  return parentNode !== undefined && parentNode.isDeleted && !node.isDeleted;
};

const changeNodeValue = ({ nodeId, value, tree }: IChangeNodeValue): Tree => {
  const node = getNode(nodeId, tree);
  if (!node) return tree;
  return { ...tree, [nodeId]: { ...node, data: { ...node.data, value } } };
};

const transferNode = ({ fromTree, toTree, nodeId }: ITransferNode): Tree => {
  const node = getNode(nodeId, fromTree);
  if (!node) return toTree;
  const mergedTree: Tree = { ...toTree, [nodeId]: node };
  if (shouldNodeBeDeletedInNewTree(node, mergedTree)) {
    return deleteNode({ nodeId, tree: mergedTree });
  }
  return mergedTree;
};

const deleteNode = ({ nodeId, tree }: IDeleteNode): Tree => {
  const node = getNode(nodeId, tree);
  if (!node) return tree;

  const deletedChildren = node.children.reduce<Tree>((prevTree, item) => {
    return { ...prevTree, ...deleteNode({ nodeId: item, tree: prevTree }) };
  }, tree);

  return {
    ...tree,
    ...deletedChildren,
    [nodeId]: { ...node, isDeleted: true },
  };
};

const createNode = ({ parentId, idForNewNode, tree }: ICreateNode): Tree => {
  const parent = getNode(parentId, tree);
  if ((parentId !== null && parent === undefined) || parent?.isDeleted)
    return tree;
  const nodeId = idForNewNode;
  const newNode = {
    data: {
      id: nodeId,
      value: `Node_${nodeId}`,
    },
    children: [],
    parent: parentId,
  };

  if (parent) {
    return {
      ...tree,
      [nodeId]: newNode,
      [parent.data.id]: {
        ...parent,
        children: [...parent.children, nodeId],
      },
    };
  } else {
    return {
      ...tree,
      [nodeId]: newNode,
    };
  }
};

const executeQueueOfOperationsOnTree = ({
  queue,
  tree,
}: IExecuteQueueOfOperations): Tree => {
  return queue.reduce<Tree>((prevTree, item) => {
    let operationResult: Tree;
    switch (item.operationType) {
      case "createNode":
        operationResult = createNode({
          parentId: item.parentId,
          tree: prevTree,
          idForNewNode: item.idForNewNode,
        });
        break;

      case "deleteNode":
        operationResult = deleteNode({ nodeId: item.nodeId, tree: prevTree });
        break;

      case "changeNodeValue":
        operationResult = changeNodeValue({
          nodeId: item.nodeId,
          value: item.value,
          tree: prevTree,
        });
        break;

      default:
        operationResult = {};
    }
    return { ...prevTree, ...operationResult };
  }, tree);
};

export const treeManager = {
  getNode,
  changeNodeValue,
  transferNode,
  deleteNode,
  createNode,
  executeQueueOfOperationsOnTree,
  isParentExistInHash,
};
