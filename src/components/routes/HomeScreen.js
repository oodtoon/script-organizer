import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Selector from "../Selector";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";

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
    <div className="home-page">
      <div className="home-container">
        <h1 className="home-title">
          Script Organizer <HistoryEduIcon fontSize="large" />
        </h1>
        <Box className="new">
          Create a{" "}
          <span className="link-container">
            <Link to="newscript" className="new-link">
              New Script
            </Link>
          </span>
        </Box>

        <div className="continue-label">
          <div>Continue working on existing script </div>
        </div>
        <span className="continue-select">
          <Selector
            id={"edit"}
            name={"edit"}
            label={"scripts"}
            value=""
            fieldToFilter={titles}
            handleFilter={handleScriptSelect}
          />
        </span>

        <div className="film-label">
          <div>Select a script to film</div>{" "}
        </div>
        <span className="film-select">
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
