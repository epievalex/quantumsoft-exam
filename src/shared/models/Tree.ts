export type NodeParent = null | string;

export type Node = {
  data: {
    id: string;
    value: string;
  };
  children: string[];
  parent: NodeParent;
  isDeleted?: true;
  isSelected?: boolean;
  treeType?: TreeType;
};

export type Tree = {
  [key: string]: Node;
};

export type TreeType = "cashedTree" | "primalTree";
