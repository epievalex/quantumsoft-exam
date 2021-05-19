import { mockedTree } from "shared/data";
import * as constants from "./constants";

import { INodeTransferAction, TreeState } from "./types";

export const initialState: TreeState = {
  initialTree: mockedTree,
  hashedNodes: null,
};

export const reducer = (
  state = initialState,
  action: INodeTransferAction
): TreeState => {
  const { type, payload } = action;

  switch (type) {
    case constants.LOAD_TREE_NODE_SUCCESS:
      return {
        ...state,
        hashedNodes: { ...state.hashedNodes, ...payload },
      };
  }

  return state;
};
