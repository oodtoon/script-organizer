import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useState } from "react";
import scriptService from "../services/scripts";
import InLineEdit from "./InLineEdit";

const Sketch = (props) => {
  const [status, setStatus] = useState(props.sketch.completed);

  const isVisible = {
    display: props.sketch.visible === true ? "grid" : "none",
    gridTemplateRows: "3em auto",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridTemplateAreas: `"drag title completed" "sketch sketch sketch"`,
    margin: "2em auto",
    border: "solid 3px black",
    boxShadow: "0 0 0.5em",
    justifyItems: "start",
    padding: "2em",
    borderRadius: "4px",
  };

  const title = {
    gridArea: "title",
    textDecoration: props.sketch.completed === true ? "line-through" : "none",
    display: "grid"
  };

  const completed = {
    gridArea: "completed",
    justifySelf: "end",
  };

  const sketchBody = {
    gridArea: "sketch",
    textDecoration: props.sketch.completed === true ? "line-through" : "none",
    display: "grid"
  };

  const drag = {
    gridArea: "drag",
    cursor: "move",
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
            sketch title:
            <InLineEdit
              text={props.sketch.sketchTitle}
              keyToEdit={"sketchTitle"}
              obj={props.script}
              scene={props.sketch}
            />
          </span>{" "}
        </Box>
        <Box style={completed}>
          completed:{" "}
          <Checkbox color="default" checked={status} onChange={handleCheck} />
        </Box>
        <Box style={sketchBody}>
          <div>
            <span>
              script:{" "}
              <InLineEdit
                text={props.sketch.sketch}
                keyToEdit={"sketch"}
                obj={props.script}
                scene={props.sketch}
              />
            </span>
          </div>
          <div>
            {props.sketch.actors.length === 1 ? "actor" : "actors"}:{" "}
            {props.sketch.actors.map((actor, index) => {
              return (
                <span key={index}>
                  {actor}
                  {index === props.sketch.actors.length - 1 ? "." : ","}{" "}
                </span>
              );
            })}
          </div>
          <div>
            <span>
              <label>camera shot(s):</label>{" "}
              <InLineEdit
                text={props.sketch.shots}
                keyToEdit={"shots"}
                obj={props.script}
                scene={props.sketch}
              />
            </span>{" "}
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Sketch;
