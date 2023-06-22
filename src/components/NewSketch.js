import { Button, TextField } from "@mui/material";
import "../App.css";

const NewSketch = (props) => {

  const handleAddActorTextField = () => {
    props.setTotalActors([...props.totalActors, props.totalActors[props.totalActors.length - 1] + 1]);
  };

  const handleRemoveActorTextField = () => {
    if (props.totalActors.length > 1) {
      const lastTextField = [...props.totalActors];
      lastTextField.pop();
      props.setTotalActors(lastTextField);
      props.setActors((prevActors) => {
        const updatedActors = [...prevActors];
        updatedActors.pop();
        return updatedActors;
      });
    }
  };

  const textFieldStyle = {
    margin: "1em",
  };

  return (
    <form className="new-sketch-form" onSubmit={(e) => props.newSketch(e, props.script.id)}>
      <TextField
        onChange={props.handleSketchTitle}
        value={props.sketchTitle}
        fullWidth
        multiline
        label="Sketch Title"
        style={textFieldStyle}
      />

      <TextField
        onChange={props.handleSketch}
        value={props.sketch}
        fullWidth
        multiline
        label="Script"
        style={textFieldStyle}
      />

      <div style={textFieldStyle}>
        {props.totalActors.map((actor, index) => {
          return (
            <span key={index}>
              {" "}
              <TextField
                onChange={(event) => props.handleActors(event, index)}
                value={props.actors[index]}
                label={`Actor: ${actor}`}
                sx={{ m: ".25em" }}
              />
            </span>
          );
        })}
        <span className="actor-btn-container">
          <Button
            variant="contained"
            onClick={handleAddActorTextField}
            className="plus"
            size="small"
          >
            +
          </Button>
          <Button
            variant="contained"
            onClick={handleRemoveActorTextField}
            className="minus"
            size="small"
          >
            -
          </Button>
        </span>
      </div>
      <TextField
        onChange={props.handleLocation}
        value={props.location}
        fullWidth
        multiline
        label="Location"
        style={textFieldStyle}
      />
      <TextField
        onChange={props.handleShots}
        value={props.shots}
        fullWidth
        multiline
        label="Shots"
        style={textFieldStyle}
      />

      <Button type="submit" variant="contained" style={textFieldStyle}>
        Create New Sketch
      </Button>
    </form>
  );
};

export default NewSketch;
