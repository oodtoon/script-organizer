import Checkbox from "@mui/material/Checkbox";
import { Box } from "@mui/material";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const Sketch = (props) => {
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
  };

  const completed = {
    gridArea: "completed",
    justifySelf: "end",
  };

  const sketchBody = {
    gridArea: "sketch",
  };

const drag = {
  gridArea: "drag",
  cursor: "move",
}

  const DragHandle = () => {
    return <div style={drag}><DragIndicatorIcon/></div>;
  };

  return (
    <div>
      <Box className="sketch-container" style={isVisible}>
        <div {...props.provided.dragHandleProps}>
          <DragHandle />
        </div>
        <Box style={title}>sketch title: {props.sketch.sketchTitle}</Box>
        <Box style={completed}>
          completed: <Checkbox color="default" checked={props.sketch.completed}/>
        </Box>
        <Box style={sketchBody}>
          <div>script: {props.sketch.sketch}</div>
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
          <div>camera shot(s): {props.sketch.shots} </div>
        </Box>
      </Box>
    </div>
  );
};

export default Sketch;
