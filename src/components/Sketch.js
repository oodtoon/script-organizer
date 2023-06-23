import Checkbox from "@mui/material/Checkbox";
import { Box, InputLabel } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useState } from "react";
import scriptService from "../services/scripts";
import InLineEdit from "./InLineEdit";
import RemoveSketch from "./RemoveSketch";

const Sketch = (props) => {
  const [status, setStatus] = useState(props.sketch.completed);

  const isVisible = {
    display: props.sketch.visible === true ? "grid" : "none",
    gridTemplateRows: "3em auto",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateAreas: `"drag title completed" "sketchInfo sketch sketch"`,
    margin: "2em auto",
    border: "solid 3px black",
    boxShadow: `rgba(240, 46, 170, 0.4) 0px 5px, rgba(240, 46, 170, 0.3) 0px 10px, rgba(240, 46, 170, 0.2) 0px 15px, rgba(240, 46, 170, 0.1) 0px 20px, rgba(240, 46, 170, 0.05) 0px 25px`,
    justifyItems: "start",
    padding: "2em",
    borderRadius: "4px",
  };

  const title = {
    gridArea: "title",
    textDecoration: props.sketch.completed === true ? "line-through" : "none",
    display: "grid",
  };

  const completed = {
    gridArea: "completed",
    justifySelf: "end",
  };

  const sketchBody = {
    gridArea: "sketchInfo",
    textDecoration: props.sketch.completed === true ? "line-through" : "none",
    display: "grid",
  };

  const script = {
    gridArea: "sketch",
    textDecoration: props.sketch.completed === true ? "line-through" : "none",
    display: "grid",
  };

  const drag = {
    gridArea: "drag",
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
        <div {...props.provided.dragHandleProps}>
          <DragHandle />
        </div>
        <Box style={title}>
          <span>
            <label htmlFor={`sketchTitle-${props.sketch.id}`}>
              sketch title:{" "}
            </label>
            <InLineEdit
              text={props.sketch.sketchTitle}
              keyToEdit={"sketchTitle"}
              obj={props.script}
              scene={props.sketch}
              id={props.sketch.id}
            />
          </span>{" "}
        </Box>
        <Box style={completed}>
          completed:{" "}
          <Checkbox color="default" checked={status} onChange={handleCheck} />
        </Box>
        <Box style={script}>
          <div style={sketchSection}>
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
        <Box style={sketchBody}>
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
        <RemoveSketch
          sketch={props.sketch}
          script={props.script}
          setScript={props.setScript}
        />
      </Box>
    </div>
  );
};

export default Sketch;
