import { Tree } from "store/nodeTransfer/types";

export const mockedTree: Tree = {
  "0": {
    data: {
      id: 0,
      value: "Root",
    },
    children: [1],
    parent: null,
  },
  "1": {
    data: {
      id: 1,
      value: "Node1",
    },
    children: [3, 4],
    parent: 0,
  },
  "3": {
    data: {
      id: 3,
      value: "Node3",
    },
    children: [],
    parent: 1,
  },
  "4": {
    data: {
      id: 4,
      value: "Node4",
    },
    children: [7, 8],
    parent: 1,
  },
  "7": {
    data: {
      id: 7,
      value: "Node7",
    },
    children: [],
    parent: 4,
  },
  "8": {
    data: {
      id: 8,
      value: "Node8",
    },
    children: [],
    parent: 4,
  },
};
