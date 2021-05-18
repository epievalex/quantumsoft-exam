export type Node = {
  data: {
    id: number;
    value: string;
  };
  children: number[];
  parent: number | null;
  nestingOfParents?: number[];
} | null;

export type HashedNodes = {
  [key: string]: Node;
} | null;

export type HashedTree = HashedNodes;

export interface TreeState {
  tree: HashedTree;
  hashedNodes: HashedNodes;
}

export interface IGetNodeAction {
  type: string;
  payload: HashedNodes;
}

export type ITreeAction = IGetNodeAction;
