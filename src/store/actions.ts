import { Dispatch } from "redux";
import * as constants from "./constants";

import { mockedTree } from "data";

import { IGetNode } from "api/interfaces";
import { Node, IGetNodeAction } from "./types";

export const getNode = (data: IGetNode) => async (
  dispatch: Dispatch<IGetNodeAction>
): Promise<Node> => {
  const res = mockedTree?.[data.nodeId] || null;

  if (res) {
    dispatch({
      type: constants.LOAD_TREE_NODE_SUCCESS,
      payload: { [res.data.id]: res },
    });
  } else {
    dispatch({ type: constants.LOAD_TREE_NODE_FAILED, payload: null });
  }

  return res;
};
