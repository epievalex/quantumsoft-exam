import { Dispatch } from "redux";
import {
  IAddOperationToQueueAction,
  IApplyChangesToPrimalTreeAction,
  IResetStateAction,
  IUpdateTree,
  IUpdateTreeAction,
  OperationQueueItem,
} from "./types";
import { RootState } from "store";
import { treeManager } from "shared/utils/treeManager";

export const resetState = () => async (
  dispatch: Dispatch<IResetStateAction>
): Promise<void> => {
  dispatch({
    type: "@nodeTransfer/RESET_STATE",
  });
};

export const addOperationToQueue = (data: OperationQueueItem) => async (
  dispatch: Dispatch<IAddOperationToQueueAction>
): Promise<void> => {
  dispatch({
    type: "@nodeTransfer/ADD_OPERATION_TO_QUEUE",
    payload: data,
  });
};

export const updateTree = ({
  changedTree,
  treeType,
  callback,
}: IUpdateTree) => async (
  dispatch: Dispatch<IUpdateTreeAction>
): Promise<void> => {
  dispatch({
    type: "@nodeTransfer/UPDATE_TREE",
    payload: {
      treeType: treeType,
      tree: changedTree,
    },
  });
  callback && callback();
};

export const applyChangesToGlobalTree = () => async (
  dispatch: Dispatch<IApplyChangesToPrimalTreeAction>,
  getState: () => RootState
): Promise<void> => {
  const operationQueue = getState().nodeTransfer.operationQueue;
  const primalTree = getState().nodeTransfer.primalTree;
  dispatch({
    type: "@nodeTransfer/APPLY_CHANGES_TO_PRIMAL_TREE",
    payload: treeManager.executeQueueOfOperationsOnTree({
      queue: operationQueue,
      tree: primalTree,
    }),
  });
};
