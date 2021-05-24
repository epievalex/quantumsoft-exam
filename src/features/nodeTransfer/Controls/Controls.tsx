import React, { useEffect, useState } from "react";
import { connect, ConnectedProps } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { v4 as uuidv4 } from "uuid";

import { Button } from "shared/components/Button";
import { TextInput } from "shared/components/TextInput";

import * as treeActions from "store/nodeTransfer/actions";
import { treeManager } from "shared/utils/treeManager";

import { Node } from "shared/models/Tree";
import { RootState } from "store";

import styles from "./Controls.module.css";

const mapStateToProps = (state: RootState) => {
  return {
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

type ILocalProps = {
  selectedNode: Node | null;
};

type Props = PropsFromRedux & ILocalProps;

const Controls: React.FC<Props> = ({
  selectedNode,
  cashedTree,
  resetState,
  updateTree,
  addOperationToQueue,
  applyChangesToGlobalTree,
}) => {
  const isCashedTreeControlDisabled = selectedNode?.treeType !== "cashedTree";
  const isDeletedNodeControlDisabled =
    !selectedNode ||
    treeManager.getNode(selectedNode.data.id, cashedTree)?.isDeleted;
  const [selectedNodeValue, setSelectedNodeValue] = useState("");

  useEffect(() => {
    if (selectedNode)
      selectedNode.treeType === "cashedTree"
        ? setSelectedNodeValue(selectedNode.data.value)
        : setSelectedNodeValue("Can't be changed");
  }, [selectedNode]);

  const onDeleteClick = () => {
    if (selectedNode) {
      updateTree({
        changedTree: treeManager.deleteNode({
          nodeId: selectedNode.data.id,
          tree: cashedTree,
        }),
        treeType: "cashedTree",
        callback: () =>
          addOperationToQueue({
            operationType: "deleteNode",
            nodeId: selectedNode.data.id,
          }),
      });
    }
  };

  const onCreateClick = () => {
    if (selectedNode) {
      const formedId = uuidv4();
      updateTree({
        changedTree: treeManager.createNode({
          parentId: selectedNode.data.id,
          tree: cashedTree,
          idForNewNode: formedId,
        }),
        treeType: "cashedTree",
        callback: () =>
          addOperationToQueue({
            operationType: "createNode",
            parentId: selectedNode.data.id,
            idForNewNode: formedId,
          }),
      });
    }
  };

  const onChangeNodeValueClick = () => {
    if (selectedNode) {
      updateTree({
        changedTree: treeManager.changeNodeValue({
          nodeId: selectedNode.data.id,
          value: selectedNodeValue,
          tree: cashedTree,
        }),
        treeType: "cashedTree",
        callback: () =>
          addOperationToQueue({
            operationType: "changeNodeValue",
            nodeId: selectedNode.data.id,
            value: selectedNodeValue,
          }),
      });
    }
  };

  return (
    <div className={styles.controls}>
      <Button
        onClick={onCreateClick}
        disabled={isCashedTreeControlDisabled || isDeletedNodeControlDisabled}
      >
        +
      </Button>

      <Button
        onClick={onDeleteClick}
        disabled={isCashedTreeControlDisabled || isDeletedNodeControlDisabled}
      >
        -
      </Button>

      <div className={styles.valueChanger}>
        <TextInput
          onChange={(e: React.FormEvent<HTMLInputElement>) =>
            setSelectedNodeValue(e.currentTarget.value)
          }
          value={selectedNodeValue}
          disabled={
            isCashedTreeControlDisabled ||
            !selectedNode ||
            selectedNode.treeType !== "cashedTree" ||
            isDeletedNodeControlDisabled
          }
          placeholder="New node value"
        />
        <Button
          onClick={onChangeNodeValueClick}
          disabled={isCashedTreeControlDisabled || isDeletedNodeControlDisabled}
        >
          a
        </Button>
      </div>

      <Button onClick={resetState}>Reset</Button>

      <Button onClick={applyChangesToGlobalTree}>Apply</Button>
    </div>
  );
};

export default connector(Controls);
