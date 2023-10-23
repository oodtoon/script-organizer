
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import scriptService from "../services/scripts";

const RemoveSketch = (props) => {
  const handleRemove = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${props.sketch.sketchTitle}?`
      )
    ) {
      const updatedSketches = props.script.scenes.filter(
        (scene) => scene.id !== props.sketch.id
      );

      const newObj = {
        ...props.script,
        scenes: updatedSketches,
      };

      scriptService.update(props.script.id, newObj).then((response) => {
        props.setScript(response);
      });
    }
  };
  return (
    <>
      <IconButton aria-label="delete" size="large" onClick={handleRemove}>
        <DeleteIcon />
      </IconButton>
    </>
  );
};

export default RemoveSketch;
