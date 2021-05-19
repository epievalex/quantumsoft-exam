import { Dispatch } from "redux";
import * as constants from "./constants";

import { mockedTree } from "shared/data";

import { IGetNode } from "api/interfaces";
import { IGetNodeAction } from "./types";
import { RootState } from "store";

export const getNode = (data: IGetNode) => async (
  dispatch: Dispatch<IGetNodeAction>,
  getState: () => RootState
): Promise<null> => {
  const res = mockedTree?.[data.nodeId];
  console.log(getState(), "state");

  if (res) {
    dispatch({
      type: constants.LOAD_TREE_NODE_SUCCESS,
      payload: { [res.data.id]: res },
    });
  } else {
    dispatch({ type: constants.LOAD_TREE_NODE_FAILED, payload: null });
  }

  return null;
};
