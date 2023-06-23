import Checkbox from "@mui/material/Checkbox";
import { Box, InputLabel } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useState } from "react";
import scriptService from "../services/scripts";
import InLineEdit from "./InLineEdit";
import RemoveSketch from "./RemoveSketch";
import "../App.css";

const Sketch = (props) => {
  const [status, setStatus] = useState(props.sketch.completed);

  const isVisible = {
    display: props.sketch.visible === true ? "grid" : "none",
  };

  const title = {
    textDecoration: props.sketch.completed === true ? "line-through" : "none",
  };

  const sketchBody = {
    textDecoration: props.sketch.completed === true ? "line-through" : "none",
  };

  const script = {
    textDecoration: props.sketch.completed === true ? "line-through" : "none",
  };

  const drag = {
    cursor: "move",
  };

  const sketchSection = {
    margin: "1em",
  };

  const DragHandle = () => {
    return (
      <div style={drag}>
        <DragIndicatorIcon />
      </div>
    );
  };


  const handleCheck = (event) => {
    const checkedSketch = { ...props.sketch, completed: event.target.checked };

    const updatedObj = {
      ...props.script,
      scenes: props.script.scenes.map((sketch) =>
        sketch.id !== props.sketch.id ? sketch : checkedSketch
      ),
    };

    scriptService.update(props.script.id, updatedObj).then((response) => {
      props.setScript(response.data);
    });

    setStatus(event.target.checked);
  };

  return (
    <div>
      <Box className="sketch-container" style={isVisible}>
        <Box className="top">
          <div {...props.provided.dragHandleProps}>
            <DragHandle />
          </div>
          <Box style={title}>
            <span>
              <label htmlFor={`sketchTitle-${props.sketch.id}`}>
                sketch title:{" "}
              </label>
                <span>
                  <InLineEdit
                    text={props.sketch.sketchTitle}
                    keyToEdit={"sketchTitle"}
                    obj={props.script}
                    scene={props.sketch}
                    id={props.sketch.id}
                    short={true}
                  />
                </span>
             
            </span>{" "}
          </Box>
          <Box>
            completed:{" "}
            <Checkbox color="default" checked={status} onChange={handleCheck} />
          </Box>
        </Box>
        <Box style={script}>
          <div className="sketch-script">
            <InputLabel htmlFor={`sketch-${props.sketch.id}`}>
              script:{" "}
            </InputLabel>
            <InLineEdit
              text={props.sketch.sketch}
              keyToEdit={"sketch"}
              obj={props.script}
              scene={props.sketch}
              id={props.sketch.id}
            />
          </div>
        </Box>
        <Box className="sketch-info" style={sketchBody}>
          <div style={sketchSection}>
            {props.sketch.actors.length === 1 ? "actor" : "actors"}:{" "}
            {props.sketch.actors.map((actor, index) => {
              return (
                <div key={index}>
                  <InLineEdit
                    text={actor}
                    keyToEdit={"actors"}
                    obj={props.script}
                    scene={props.sketch}
                    index={index}
                    id={props.sketch.id}
                  />
                </div>
              );
            })}
          </div>
          <div style={sketchSection}>
            <span>
              <InputLabel htmlFor={`location-${props.sketch.id}`}>
                location:
              </InputLabel>
              <InLineEdit
                text={props.sketch.location}
                keyToEdit={"location"}
                obj={props.script}
                scene={props.sketch}
                id={props.sketch.id}
              />
            </span>
          </div>
          <div style={sketchSection}>
            <span>
              <InputLabel htmlFor={`shots-${props.sketch.id}`}>
                camera shot(s):
              </InputLabel>{" "}
              <InLineEdit
                text={props.sketch.shots}
                keyToEdit={"shots"}
                obj={props.script}
                scene={props.sketch}
                id={props.sketch.id}
              />
            </span>{" "}
          </div>
        </Box>
        <div className="trash">
          <RemoveSketch
            sketch={props.sketch}
            script={props.script}
            setScript={props.setScript}
          />
        </div>
      </Box>
    </div>
  );
};

export default Sketch;
