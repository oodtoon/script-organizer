import { Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const Selector = (props) => {

  return (
    <>
      <span className="selector">
        <FormControl sx={{ mb: 5, minWidth: 300 }}>
          <InputLabel id={props.id}>{props.label}</InputLabel>
          <Select
            labelId={props.id}
            id={props.id}
            label={props.label}
            multiple={props.multiple}
            value={props.value}
            onChange={props.handleFilter}
          >
            {props.fieldToFilter ? (
              props.fieldToFilter.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))
            ) : (
              <MenuItem>No Actors In Any Scenes</MenuItem>
            )}
          </Select>
        </FormControl>
      </span>
    </>
  );
};

export default Selector;
