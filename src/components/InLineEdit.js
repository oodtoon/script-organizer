import { useEffect, useRef, useState } from "react";
import { TextField } from "@mui/material";
import scriptService from "../services/scripts";
import "../App.css";

const InLineEdit = ({ text, keyToEdit, obj, scene, index, id, short }) => {
  const [textEdit, setTextEdit] = useState(text);
  const [isInputHidden, setIsInputHidden] = useState(true);
  const inputRef = useRef(null);

  const width = short === true ? false : true

  const onChange = (event) => {
    setTextEdit(event.target.value);
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey && isInputHidden === false) {
      setIsInputHidden(true);
    }
  };

  const blurHandler = (event) => {
    if (textEdit !== text) {
      if (keyToEdit === "actors") {
        const updatedActorsArr = scene.actors.map((actor) =>
          actor === text ? textEdit : actor
        );
        const updatedActor = { ...scene, actors: updatedActorsArr };

        const updatedSketches = obj.scenes.map((scene) =>
          scene.id !== updatedActor.id ? scene : updatedActor
        );

        const scriptObj = {
          ...obj,
          scenes: updatedSketches,
        };
        scriptService.update(obj.id, scriptObj).then((response) => {
          setIsInputHidden(true);
          const replaceText = response.data.scenes.find(
            (scene) => scene.id === updatedActor.id
          );
          setTextEdit(replaceText.actors[index]);
        });
      } else {
        const updatedLine = { ...scene, [keyToEdit]: textEdit };

        console.log("scene", scene)


        const updatedScenes = obj.scenes.map((scene) =>
          scene.id !== updatedLine.id ? scene : updatedLine
        );

        const scriptObj = {
          ...obj,
          scenes: updatedScenes,
        };

        console.log("script", scriptObj)

        scriptService.update(obj.id, scriptObj).then((response) => {
          setIsInputHidden(true);
          const replaceText = response.data.scenes.find(
            (scene) => scene.id === updatedLine.id
          );
          setTextEdit(replaceText[keyToEdit]);
        });
      }
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
          id={`${keyToEdit}-${id}`}
          value={textEdit}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={blurHandler}
          onClick={() => setIsInputHidden(false)}
          inputProps={{ ref: (input) => (inputRef.current = input) }}
          size="small"
          className={`inline-edit ${isInputHidden ? "hidden" : ""}`}
          multiline
          fullWidth={width}
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
        className="inline-text"
      >
        {textEdit}
      </span>
    </>
  );
};

export default InLineEdit;
