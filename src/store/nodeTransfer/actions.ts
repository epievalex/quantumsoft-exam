import { Dispatch } from "redux";

import * as constants from "./constants";

import { IGetNode } from "api/nodeTransfers/interfaces";
import {
  ICommitChangedNode,
  ICommitChangedNodeAction,
  ICreateLocalNodeAction,
  IDeleteNode,
  IDeleteNodeAction,
  IGetNodeAction,
  IResetStateAction,
  IUpdateTree,
  IUpdateTreeAction,
} from "./types";
import { RootState } from "store";

export const resetState = () => async (
  dispatch: Dispatch<IResetStateAction>
): Promise<void> => {
  dispatch({
    type: constants.RESET_STATE,
  });
};

export const getNode = (data: IGetNode) => async (
  dispatch: Dispatch<
    IGetNodeAction | ICommitChangedNodeAction | IDeleteNodeAction
  >,
  getState: () => RootState
): Promise<void> => {
  const res = getState().nodeTransfer.initialTree[data.nodeId];
  const changedNodesHash = getState().nodeTransfer.changedNodesHash;

  if (res) {
    dispatch({
      type: constants.GET_NODE,
      payload: { [res.data.id]: { ...res } },
    });
    if (res.parent !== null && changedNodesHash[res.parent]) {
      deleteNode({ nodeIdToDelete: res.data.id, treeType: "hashedNodes" })(
        dispatch,
        getState
      );
    }
  }
};

export const createLocalNode = (data: { parentId: number | null }) => async (
  dispatch: Dispatch<ICreateLocalNodeAction | ICommitChangedNodeAction>,
  getState: () => RootState
): Promise<void> => {
  const hashedNodes = getState().nodeTransfer.hashedNodes;
  const initialTree = getState().nodeTransfer.initialTree;
  const newId =
    Math.max(
      ...Object.keys({ ...hashedNodes, ...initialTree }).map((a) => +a)
    ) + 1;

  const res =
    data.parentId === null
      ? {
          [newId]: {
            data: {
              id: newId,
              value: `Node${newId}`,
            },
            parent: data.parentId,
            children: [],
          },
        }
      : {
          [data.parentId]: {
            ...hashedNodes?.[data.parentId],
            children: [...hashedNodes?.[data.parentId].children, newId],
          },
          [newId]: {
            data: {
              id: newId,
              value: `Node${newId}`,
            },
            parent: data.parentId,
            children: [],
          },
        };

  dispatch({ type: constants.CREATE_LOCAL_NODE, payload: res });
  [data.parentId, newId].forEach(
    (changedNode) =>
      changedNode !== null &&
      dispatch({
        type: constants.COMMIT_CHANGED_NODE,
        payload: res[changedNode],
      })
  );
};

export const deleteNode = ({ nodeIdToDelete, treeType }: IDeleteNode) => async (
  dispatch: Dispatch<IDeleteNodeAction | ICommitChangedNodeAction>,
  getState: () => RootState
): Promise<void> => {
  const tree = getState().nodeTransfer[treeType];
  const nodeToDelete = tree[nodeIdToDelete];
  const changedNodes: number[] = [];
  changedNodes.push(nodeIdToDelete);
  dispatch({
    type: constants.DELETE_LOCAL_NODE,
    payload: { treeType, nodeIdToDelete },
  });

  if (nodeToDelete.children.length) {
    nodeToDelete.children.forEach((child) => {
      if (tree[child]) {
        deleteNode({ nodeIdToDelete: child, treeType })(dispatch, getState),
          changedNodes.push(child);
      }
    });
  }

  treeType === "hashedNodes" &&
    changedNodes.forEach((changedNode) => {
      const updatedNode = getState().nodeTransfer.hashedNodes[changedNode];
      dispatch({
        type: constants.COMMIT_CHANGED_NODE,
        payload: updatedNode,
      });
    });
};

export const updateTree = ({ treeType }: IUpdateTree) => async (
  dispatch: Dispatch<
    IUpdateTreeAction | IDeleteNodeAction | ICommitChangedNodeAction
  >,
  getState: () => RootState
): Promise<void> => {
  const changedNodesHash = getState().nodeTransfer.changedNodesHash;
  Object.values(changedNodesHash).forEach(
    (node) =>
      node.isDeleted &&
      deleteNode({ nodeIdToDelete: node.data.id, treeType: "initialTree" })(
        dispatch,
        getState
      )
  );

  dispatch({
    type: constants.UPDATE_TREE,
    payload: { treeType, changedNodesHash },
  });
};

export const commitChangedNode = ({
  changedNode,
}: ICommitChangedNode) => async (
  dispatch: Dispatch<ICommitChangedNodeAction>
): Promise<void> => {
  dispatch({ type: constants.COMMIT_CHANGED_NODE, payload: changedNode });
};
