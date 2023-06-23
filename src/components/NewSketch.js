import { Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "../App.css";

import { styled } from "@mui/material/styles";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "black",
  borderRadius: "0px",
  fontWeight: "700",
  "&:hover": {
    backgroundColor: "white",
    border: "3px solid black",
    color: "black",
    boxShadow: ".5em .5em hotpink",
  },
}));

const ActorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "black",
  borderRadius: "0px",
  fontWeight: "700",
  "&:hover": {
    backgroundColor: "white",
    border: "3px solid black",
    color: "black",
    boxShadow: ".5em .5em hotpink",
    padding: ".1em",
  },
}));

const NewSketch = (props) => {
  const handleAddActorTextField = () => {
    props.setTotalActors([
      ...props.totalActors,
      props.totalActors[props.totalActors.length - 1] + 1,
    ]);
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
    alignSelf: "start",
  };

  return (
    <form
      className="new-sketch-form"
      onSubmit={(e) => props.newSketch(e, props.script.id)}
    >
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

      <div>
        <span className="plus">
          <ActorButton
            variant="contained"
            onClick={handleAddActorTextField}
            className="plus"
            size="small"
          >
            <AddIcon />
          </ActorButton>
        </span>
        <span className="minus">
          <ActorButton
            variant="contained"
            onClick={handleRemoveActorTextField}
            className="minus"
            size="small"
          >
            <RemoveIcon />
          </ActorButton>
        </span>

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

      <div className="create-btn">
        <CustomButton type="submit" variant="contained" style={textFieldStyle}>
          Create New Sketch
        </CustomButton>
      </div>
    </form>
  );
};

export default NewSketch;
