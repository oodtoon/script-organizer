import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import scriptService from "../services/scripts";

const Delete = (props) => {
    const navigate = useNavigate()

    const handleDelete = (id) => {
        if (window.confirm(`Are you sure you want to delete ${props.script.title}`)) {
            scriptService.remove(id).then(() => {
                const updatedScripts = props.allScripts.filter(script => script.id !== id)
                props.setAllScripts(updatedScripts)
            })
            
            navigate("/")
        }
    }

  return (
    <>
      <Button variant="outlined" onClick={() => handleDelete(props.script.id)} color="error">Delete</Button>
    </>
  );
};

export default Delete;
