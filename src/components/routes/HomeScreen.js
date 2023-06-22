import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Selector from "../Selector";
import "../../App.css";

const HomeScreen = (props) => {
  const navigate = useNavigate();

  const titles = props.allScripts.map((script) => script.title);

  const handleScriptSelect = (event) => {

    const theScript = props.allScripts.find(
      (script) => script.title === event.target.value
    );
    props.setScript(theScript);

    localStorage.setItem("selectedScript", JSON.stringify(theScript.id));

    if (event.target.name === "edit") {
      props.setIsDraft(true);
    } else {
      props.setIsDraft(false);
    }
    navigate("/script");
  };

  if (!props.allScripts) {
    return <div>One moment loading</div>;
  }

  return (
    <div className="home-container">
      <h1>Script Organizer</h1>
      <Box sx={{ m: "1em" }}>
        Create a <Link to="newscript">New Script</Link>
      </Box>
      <div>
        Continue working on existing script{" "}
        <span>
          <Selector
            id={"edit"}
            name={"edit"}
            label={"scripts"}
            value=""
            fieldToFilter={titles}
            handleFilter={handleScriptSelect}
          />
        </span>
      </div>
      <div>
        Select a script to film{" "}
        <span>
          <Selector
            id={"film"}
            name={"film"}
            label={"scripts"}
            value=""
            fieldToFilter={titles}
            handleFilter={handleScriptSelect}
          />
        </span>
      </div>
    </div>
  );
};

export default HomeScreen;
