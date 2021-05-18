import { mockedTree } from "data";
import * as constants from "store/constants";

import { ITreeAction, TreeState } from "./types";

export const initialState: TreeState = {
  tree: mockedTree,
  hashedNodes: null,
};

export const reducer = (
  state = initialState,
  action: ITreeAction
): TreeState => {
  const { type, payload } = action;
  console.log(payload);

  switch (type) {
    case constants.LOAD_TREE_NODE_SUCCESS:
      return {
        ...state,
        hashedNodes: { ...state.hashedNodes, ...payload },
      };
  }

  return state;
};
