// Не давать поользователю работать с удаленным узлом
import React, { useState } from "react";
import { bindActionCreators, Dispatch } from "redux";
import { connect, ConnectedProps } from "react-redux";

import { Button } from "shared/components/Button";
import { Graph } from "shared/components/Graph";
import { Controls } from "./Controls";

import * as treeActions from "store/nodeTransfer/actions";

import { treeManager } from "shared/utils/treeManager";

import { RootState } from "store";
import { Tree, TreeType, Node } from "shared/models/Tree";

import styles from "./NodeTransfer.module.css";

export interface IDrawNode {
  nodeId: string;
  treeToDraw: Tree;
  treeType: TreeType | undefined;
  drawChildren?: boolean;
}

const mapStateToProps = (state: RootState) => {
  return {
    primalTree: state.nodeTransfer.primalTree,
    cashedTree: state.nodeTransfer.cashedTree,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      resetState: treeActions.resetState,
      updateTree: treeActions.updateTree,
      addOperationToQueue: treeActions.addOperationToQueue,
      applyChangesToGlobalTree: treeActions.applyChangesToGlobalTree,
    },
    dispatch
  );
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const NodeTransfer: React.FC<Props> = ({
  primalTree,
  cashedTree,
  updateTree,
}) => {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const isPrimalTreeControlDisabled =
    selectedNode?.treeType !== "primalTree" ||
    treeManager.getNode(selectedNode.data.id, primalTree)?.isDeleted;

  const onNodeClick = (node: Node, treeType: TreeType) => {
    setSelectedNode({ ...node, isSelected: true, treeType });
  };

  const onTrasferButtonClick = () => {
    if (selectedNode && !isPrimalTreeControlDisabled) {
      updateTree({
        changedTree: treeManager.transferNode({
          fromTree: primalTree,
          toTree: cashedTree,
          nodeId: selectedNode.data.id,
        }),
        treeType: "cashedTree",
      });
    }
  };

  return (
    <div className={styles.nodeTransfer}>
      <div className={styles.treeViews}>
        <Graph
          tree={cashedTree}
          treeType="cashedTree"
          onNodeClick={onNodeClick}
          selectedNode={selectedNode}
        />
        <div className={styles.button}>
          <Button
            onClick={onTrasferButtonClick}
            disabled={isPrimalTreeControlDisabled}
          >{`<<<`}</Button>
        </div>
        <Graph
          tree={primalTree}
          onNodeClick={onNodeClick}
          treeType="primalTree"
          selectedNode={selectedNode}
        />
      </div>
      <Controls selectedNode={selectedNode} />
    </div>
  );
};

export default connector(NodeTransfer);
