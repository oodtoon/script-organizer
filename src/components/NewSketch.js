import { Button, TextField } from "@mui/material";
import "../App.css";
import { useState } from "react";

const NewSketch = (props) => {
  const [totalActors, setTotalActors] = useState([1]);

  const handleAddActorTextField = () => {
    setTotalActors([...totalActors, totalActors[totalActors.length - 1] + 1]);
  };

  const handleRemoveActorTextField = () => {
    if (totalActors.length > 1) {
      const lastTextField = [...totalActors];
      lastTextField.pop()
      setTotalActors(lastTextField)
    }
  };


  return (
    <form className="new-sketch-form" onSubmit={props.newSketch}>
      <div>
        <label>Sketch Title:</label>
        <TextField onChange={props.handleSketchTitle}/>
      </div>
      <div>
        <label>Script:</label>
        <TextField onChange={props.handleSketch} />
      </div>
      <div>
        {totalActors.map((actor, index) => {
          return (
            <span key={index}>
              {" "}
              <label>Actor {actor}:</label>
              <TextField onChange={(event) => props.handleActors(event, index)} />
            </span>
          );
        })}
        <span>
          <Button variant="contained" onClick={handleAddActorTextField}>
            +
          </Button>
          <Button variant="contained" onClick={handleRemoveActorTextField}>
            -
          </Button>
        </span>
      </div>
      <div>
        <label>Shots:</label>
        <TextField onChange={props.handleShots} />
      </div>
      <Button type="submit" variant="contained">
        Create New Sketch
      </Button>
    </form>
  );
};

export default NewSketch;
