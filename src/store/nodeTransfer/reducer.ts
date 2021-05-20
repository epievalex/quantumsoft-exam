import { Reducer } from "redux";
import { mockedTree } from "shared/data";
import * as constants from "./constants";

import { INodeTransferAction, TreeState } from "./types";

export const initialState = {
  initialTree: mockedTree,
  hashedNodes: {},
  changedNodesHash: {},
};

export const reducer: Reducer<TreeState, INodeTransferAction> = (
  state = initialState,
  action
): TreeState => {
  switch (action.type) {
    case constants.RESET_STATE:
      return initialState;

    case constants.GET_NODE:
      return {
        ...state,
        hashedNodes: { ...state.hashedNodes, ...action.payload },
      };

    case constants.CREATE_LOCAL_NODE:
      return {
        ...state,
        hashedNodes: { ...state.hashedNodes, ...action.payload },
      };

    case constants.DELETE_LOCAL_NODE:
      return {
        ...state,
        [action.payload.treeType]: {
          ...state[action.payload.treeType],
          [action.payload.nodeIdToDelete]: {
            ...state[action.payload.treeType][action.payload.nodeIdToDelete],
            isDeleted: true,
          },
        },
      };

    case constants.COMMIT_CHANGED_NODE:
      return {
        ...state,
        changedNodesHash: {
          ...state.changedNodesHash,
          [action.payload.data.id]: action.payload,
        },
      };

    case constants.UPDATE_TREE:
      return {
        ...state,
        [action.payload.treeType]: {
          ...state[action.payload.treeType],
          ...action.payload.changedNodesHash,
        },
      };

    default:
      return state;
  }
};
