import { Reducer } from "redux";
import { mockedTree } from "shared/data";

import { INodeTransferAction, TreeState } from "./types";

const initialState = {
  primalTree: mockedTree,
  cashedTree: {},
  operationQueue: [],
};

export const reducer: Reducer<TreeState, INodeTransferAction> = (
  state = initialState,
  action
): TreeState => {
  switch (action.type) {
    case "@nodeTransfer/RESET_STATE":
      return initialState;

    case "@nodeTransfer/UPDATE_TREE":
      return {
        ...state,
        [action.payload.treeType]: action.payload.tree,
      };

    case "@nodeTransfer/ADD_OPERATION_TO_QUEUE":
      return {
        ...state,
        operationQueue: [...state.operationQueue, action.payload],
      };

    case "@nodeTransfer/APPLY_CHANGES_TO_PRIMAL_TREE":
      return {
        ...state,
        primalTree: action.payload,
        operationQueue: [],
      };

    default:
      return state;
  }
};
