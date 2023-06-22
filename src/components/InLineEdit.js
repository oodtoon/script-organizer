import { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import scriptService from "../services/scripts";
import "../App.css";

const InLineEdit = ({ text, keyToEdit, obj, scene }) => {
  const [textEdit, setTextEdit] = useState(text);
  const [isInputHidden, setIsInputHidden] = useState(true);
  const inputRef = useRef(null);

  const onChange = (event) => {
    setTextEdit(event.target.value);
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && isInputHidden === false) {
      setIsInputHidden(true);
    }
  };

  const blurHandler = (event) => {
    const updatedLine = { ...scene, [keyToEdit]: textEdit };

    const updatedScenes = obj.scenes.map((scene) =>
      scene.id !== updatedLine.id ? scene : updatedLine
    );

    const scriptObj = {
      ...obj,
      scenes: updatedScenes,
    };
    if (textEdit !== text) {
      scriptService.update(obj.id, scriptObj).then((response) => {
        setIsInputHidden(true);
        const replaceText = response.data.scenes.find(
          (scene) => scene.id === updatedLine.id
        );
        setTextEdit(replaceText[keyToEdit]);
      });
    } else {
      setIsInputHidden(true);
    }
  };

  useEffect(() => {
    if (!isInputHidden) {
      inputRef.current.focus();
    }
  }, [isInputHidden]);

  return (
    <>
      <span>
        <TextField
          type="text"
          value={textEdit}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={blurHandler}
          onClick={() => setIsInputHidden(false)}
          inputProps={{ ref: (input) => (inputRef.current = input) }}
          size="small"
          className={`inline-edit ${isInputHidden ? "hidden" : ""}`}
          multiline
          sx={{ width: "80%" }}
        />
      </span>

      <span
        style={{ fontWeight: "initial" }}
        onClick={() => setIsInputHidden(false)}
        tabIndex={0}
        onFocus={() => {
          setIsInputHidden(false);
        }}
        hidden={!isInputHidden}
      >
        {textEdit}
      </span>
    </>
  );
};

export default InLineEdit;
