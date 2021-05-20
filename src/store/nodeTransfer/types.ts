import * as constants from "./constants";

export type Node = {
  data: {
    id: number;
    value: string;
  };
  children: number[];
  parent: null | number;
  isDeleted?: true;
};

export type Tree = {
  [key: string]: Node;
};

export type TreeType = "hashedNodes" | "initialTree";

export type ChangedNodesHash = Tree;

export interface TreeState {
  initialTree: Tree;
  hashedNodes: Tree;
  changedNodesHash: ChangedNodesHash;
}

export interface IResetStateAction {
  type: typeof constants.RESET_STATE;
}

export interface IGetNodeAction {
  type: typeof constants.GET_NODE;
  payload: Tree;
}

export interface ICreateLocalNodeAction {
  type: typeof constants.CREATE_LOCAL_NODE;
  payload: Tree;
}

export interface IDeleteNode {
  nodeIdToDelete: number;
  treeType: TreeType;
}

export interface IDeleteNodeAction {
  type: typeof constants.DELETE_LOCAL_NODE;
  payload: { treeType: TreeType; nodeIdToDelete: number };
}

export interface IUpdateTree {
  treeType: TreeType;
}
export interface IUpdateTreeAction {
  type: typeof constants.UPDATE_TREE;
  payload: { treeType: TreeType; changedNodesHash: Tree };
}

export interface ICommitChangedNode {
  changedNode: Node;
}
export interface ICommitChangedNodeAction {
  type: typeof constants.COMMIT_CHANGED_NODE;
  payload: Node;
}

export type INodeTransferAction =
  | IResetStateAction
  | IGetNodeAction
  | ICreateLocalNodeAction
  | IDeleteNodeAction
  | IUpdateTreeAction
  | ICommitChangedNodeAction;
