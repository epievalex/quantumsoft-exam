export type Node = {
  data: {
    id: number;
    value: string;
  };
  children: number[];
  parent: number | null;
  isDeleted?: true;
};

export type Tree = {
  [key: string]: Node;
} | null;

export interface TreeState {
  initialTree: Tree;
  hashedNodes: Tree;
}

export interface IGetNodeAction {
  type: string;
  payload: Tree;
}

export type INodeTransferAction = IGetNodeAction;
