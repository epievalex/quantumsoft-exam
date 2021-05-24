import { Tree } from "shared/models/Tree";

export const mockedTree: Tree = {
  "0": {
    data: {
      id: "0",
      value: "Root",
    },
    children: ["1", "10", "11"],
    parent: null,
  },
  "1": {
    data: {
      id: "1",
      value: "Node_1",
    },
    children: ["3", "4"],
    parent: "0",
  },
  "3": {
    data: {
      id: "3",
      value: "Node_3",
    },
    children: ["9"],
    parent: "1",
  },
  "4": {
    data: {
      id: "4",
      value: "Node_4",
    },
    children: ["7", "8"],
    parent: "1",
  },
  "7": {
    data: {
      id: "7",
      value: "Node_7",
    },
    children: [],
    parent: "4",
  },
  "8": {
    data: {
      id: "8",
      value: "Node_8",
    },
    children: ["12"],
    parent: "4",
  },
  "9": {
    data: {
      id: "9",
      value: "Node_9",
    },
    parent: "3",
    children: [],
    isDeleted: true,
  },
  "10": {
    data: {
      id: "10",
      value: "Node_10",
    },
    parent: "0",
    children: ["15"],
  },
  "11": {
    data: {
      id: "11",
      value: "Node_11",
    },
    parent: "0",
    children: ["13", "14"],
    isDeleted: true,
  },
  "12": {
    data: {
      id: "12",
      value: "Node_12",
    },
    parent: "8",
    children: [],
    isDeleted: true,
  },
  "13": {
    data: {
      id: "13",
      value: "Node_13",
    },
    parent: "11",
    children: [],
    isDeleted: true,
  },
  "14": {
    data: {
      id: "14",
      value: "Node_14",
    },
    parent: "11",
    children: [],
    isDeleted: true,
  },
  "15": {
    data: {
      id: "15",
      value: "Node_15",
    },
    parent: "10",
    children: ["16"],
  },
  "16": {
    data: {
      id: "16",
      value: "Node_16",
    },
    parent: "15",
    children: ["17"],
  },
  "17": {
    data: {
      id: "17",
      value: "Node_17",
    },
    parent: "16",
    children: ["18"],
  },
  "18": {
    data: {
      id: "18",
      value: "Node_18",
    },
    parent: "17",
    children: [],
  },
};
