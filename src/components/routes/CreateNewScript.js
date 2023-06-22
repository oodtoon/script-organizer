import { TextField, Button } from "@mui/material";
import { useState } from "react";
import scriptService from "../../services/scripts";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import HomeButton from "../HomeButton";

const randomId = () => {
  return (Math.random() * 100000000).toString();
};

const CreateNewScript = (props) => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const newVideoScript = (event) => {
    event.preventDefault();

    const newScriptObj = {
      title: title,
      scenes: [],
      id: randomId(),
    };

    scriptService
      .create(newScriptObj)
      .then((response) =>
        props.setAllScripts(props.allScripts.concat(response.data))
      );
    props.setScript(newScriptObj);
    props.setIsDraft(true);

    localStorage.setItem("selectedScript", JSON.stringify(newScriptObj.id));

    navigate("/script");
  };

  return (
    <>
      <HomeButton place="Back" />
      <form className="create-container" onSubmit={newVideoScript}>
        <h1>Create A New Video Script</h1>

        <TextField
          label="Video Title"
          required
          fullWidth
          multiline
          onChange={handleTitle}
          value={title}
        />
        <div>
          <Button variant="contained" sx={{ mt: "2em" }} type="submit">
            Create Video Script
          </Button>
        </div>
      </form>
    </>
  );
};

export default CreateNewScript;