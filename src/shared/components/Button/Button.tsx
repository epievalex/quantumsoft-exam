import React from "react";
import cn from "classnames";

import styles from "./Button.module.css";

export interface IButton {
  onClick?: () => void;
  disabled?: boolean;
}

const Button: React.FC<IButton> = ({ onClick, children, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={cn(styles.button, { [styles.disabled]: disabled })}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
