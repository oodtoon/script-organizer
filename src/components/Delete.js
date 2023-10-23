import { useNavigate } from "react-router-dom";
import scriptService from "../services/scripts";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Delete = (props) => {
  const navigate = useNavigate();

  const handleDelete = (id) => {
    if (
      window.confirm(`Are you sure you want to delete ${props.script.title}`)
    ) {
      scriptService.remove(id).then(() => {
        const updatedScripts = props.allScripts.filter(
          (script) => script.id !== id
        );
        props.setAllScripts(updatedScripts);
      });

      navigate("/");
    }
  };

  return (
    <>
      <IconButton aria-label="delete" size="large" onClick={() => handleDelete(props.script.id)}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default Delete;
