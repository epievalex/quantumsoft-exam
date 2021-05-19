// Disable'ть кнопку добавлния, если выбранный item удален
import React, { useMemo, useState } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";
import cn from "classnames";

import { Button } from "shared/components/Button";

import * as treeActions from "store/nodeTransfer/actions";

import { RootState } from "store";
import { Tree } from "store/nodeTransfer/types";

import styles from "./NodeTransfer.module.css";

export type TreeType = "initial" | "transfered";

export type Node = {
  data: {
    id: number;
    value: string;
  };
  children: number[];
  parent: number | null;
  isDeleted?: true;
  treeType?: TreeType;
};

export interface IDrawNode {
  nodeId: number;
  treeToDraw: Tree;
  treeType?: TreeType;
  drawChildren?: boolean;
}

const mapStateToProps = (state: RootState) => {
  return {
    initialTree: state.nodeTransfer.initialTree,
    hashedNodes: state.nodeTransfer.hashedNodes,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      getNode: treeActions.getNode,
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export interface ILocalProps {
  initialTree: Tree;
}

type Props = ILocalProps & PropsFromRedux;

const NodeTransfer: React.FC<Props> = ({
  initialTree,
  hashedNodes,
  getNode,
}) => {
  const [selectedNode, setSelectedNode] = useState<Node>();

  const isParentExistInTree: (node: Node, treeToExplore: Tree) => boolean = (
    node,
    treeToExplore
  ) => {
    if (node.parent === null) return false;
    return Boolean(treeToExplore?.[node.parent]);
  };

  const drawNode = ({
    nodeId,
    treeToDraw,
    drawChildren,
    treeType,
  }: IDrawNode) => {
    if (treeToDraw === null) return;
    return (
      <div key={nodeId} className={styles.node}>
        <p
          className={cn(styles.nodeValue, {
            [styles.nodeValue_active]:
              nodeId === selectedNode?.data.id &&
              selectedNode.treeType === treeType,
          })}
          onClick={() => {
            setSelectedNode({ ...treeToDraw[nodeId], treeType });
          }}
        >
          {treeToDraw[nodeId]?.data.value}
        </p>
        {drawChildren &&
          treeToDraw[nodeId]?.children.length !== 0 &&
          treeToDraw[nodeId]?.children.map((childId) => {
            return (
              <div key={childId} className={styles.nestedNode}>
                {drawNode({
                  nodeId: childId,
                  treeToDraw,
                  drawChildren,
                  treeType,
                })}
              </div>
            );
          })}
      </div>
    );
  };

  const drawGraph = (tree: Tree, treeType?: TreeType) => {
    if (tree !== null) {
      return Object.keys(tree).map((nodeId) => {
        if (!isParentExistInTree(tree[+nodeId], tree)) {
          return drawNode({
            nodeId: +nodeId,
            treeToDraw: tree,
            treeType,
            drawChildren: true,
          });
        }
      });
    }
  };

  const onTrasferButtonClick = () => {
    if (selectedNode !== undefined) {
      getNode({ nodeId: selectedNode.data.id });
    }
  };

  const memoizedhashedNodes = useMemo(() => {
    return drawGraph(hashedNodes, "transfered");
  }, [hashedNodes, selectedNode]);

  return (
    <div className={styles.nodeTransfer}>
      <div className={styles.controlPanel}>
        <div className={styles.treeView}>{memoizedhashedNodes}</div>
        <div className={styles.controls}></div>
      </div>
      <div className={styles.button}>
        <Button
          onClick={onTrasferButtonClick}
          disabled={selectedNode?.treeType !== "initial"}
        >{`<<<`}</Button>
      </div>
      <div className={styles.treeView}>{drawGraph(initialTree, "initial")}</div>
    </div>
  );
};

export default connector(NodeTransfer);
