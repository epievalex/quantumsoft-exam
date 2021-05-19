import React from "react";
import { NodeTransfer } from "features/nodeTransfer";

import styles from "./App.module.css";

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <NodeTransfer />
    </div>
  );
};

export default App;
