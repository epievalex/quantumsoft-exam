import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import * as treeActions from "store/actions";

import { RootState } from "store";

import styles from "./App.module.css";

const mapStateToProps = (state: RootState) => {
  return {
    tree: state.tree,
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

type Props = PropsFromRedux;

const App: React.FC<Props> = ({ tree, getNode }) => {
  useEffect(() => {
    getNode({ nodeId: 4 });
  }, [getNode]);

  console.log(tree, "tree");

  return (
    <div className={styles.app}>
      <div className={styles["nodes-transfer"]}></div>
    </div>
  );
};

export default connector(App);
