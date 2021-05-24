import React, { useEffect, useState } from "react";

import styles from "./TextInput.module.css";

export interface ITextInput {
  value?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
}

const TextInput: React.FC<ITextInput> = ({
  value,
  onChange,
  disabled,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (value) setInputValue(value);
  }, [value]);

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    setInputValue(e.currentTarget.value);
  };

  return (
    <div>
      <input
        className={styles.input}
        onChange={onInputChange}
        value={inputValue}
        disabled={disabled}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;
