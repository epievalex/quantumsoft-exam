import { NodeParent, Tree, TreeType } from "shared/models/Tree";

export type OperationQueueItem =
  | {
      operationType: "deleteNode";
      nodeId: string;
    }
  | {
      operationType: "createNode";
      parentId: NodeParent;
      idForNewNode: string;
    }
  | {
      operationType: "changeNodeValue";
      nodeId: string;
      value: string;
    };

export interface TreeState extends Record<TreeType, Tree> {
  operationQueue: OperationQueueItem[];
}

export interface IResetStateAction {
  type: "@nodeTransfer/RESET_STATE";
}

export interface IAddOperationToQueueAction {
  type: "@nodeTransfer/ADD_OPERATION_TO_QUEUE";
  payload: OperationQueueItem;
}

export type IUpdateTree = {
  changedTree: Tree;
  treeType: TreeType;
  callback?: () => void;
};
export interface IUpdateTreeAction {
  type: "@nodeTransfer/UPDATE_TREE";
  payload: { treeType: TreeType; tree: Tree };
}

export interface IApplyChangesToPrimalTreeAction {
  type: "@nodeTransfer/APPLY_CHANGES_TO_PRIMAL_TREE";
  payload: Tree;
}

export type INodeTransferAction =
  | IResetStateAction
  | IUpdateTreeAction
  | IAddOperationToQueueAction
  | IApplyChangesToPrimalTreeAction;
