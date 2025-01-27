import React, { useState } from "react";
import { Input, InputGroup, Icon, Alert } from "rsuite";

const EditableInput = ({
  initialValue,
  onSave,
  label = null,
  placeholder = "Write your name",
  emptyMsg = "Input is empty",
  wrapperClassName = "",
  ...inputProps
}) => {
  const [input, setInput] = useState(initialValue);
  const [isEditable, setIsEditable] = useState(false);

  const handleChange = (value) => {
    setInput(value);
  };

  const onEditClick = () => {
    setIsEditable(!isEditable);
    setInput(initialValue);
  };

  const onSaveClick = async () => {
    const trimmed = input.trim(); // removing unnecessary spaces around input
    if (trimmed === "") {
      Alert.info(emptyMsg, 4000);
    }

    if (trimmed !== initialValue) {
      await onSave(trimmed);
    }

    setIsEditable(false);
  };

  return (
    <div className={wrapperClassName}>
      {label}
      <InputGroup>
        <Input
          {...inputProps}
          disabled={!isEditable}
          placeholder={placeholder}
          value={input}
          onChange={handleChange}
        />

        <InputGroup.Button onClick={onEditClick}>
          <Icon icon={isEditable ? "close" : "edit2"} />
        </InputGroup.Button>

        {isEditable && (
          <InputGroup.Button onClick={onSaveClick}>
            <Icon icon="check" />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default EditableInput;
