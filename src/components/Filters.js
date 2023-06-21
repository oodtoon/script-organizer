import Selector from "./Selector";
import { Button } from "@mui/material";

const Filters = (props) => {
    const handleFilterReset = () => {
        props.setNameFilter([])
        props.setStatusFiler("All")
        props.setNumberFilter("")
        props.setIsFilterChange(true)
    }

  return (
    <>
      <div className="filter-container">
        <h1>Scenes to display:</h1>
        <div>
          <span>
            <Selector
              id={"total-actors"}
              label={"Number of Actors"}
              value={props.numberFilter}
              multiple={false}
              fieldToFilter={[...props.total, "All"]}
              handleFilter={props.handleNumberFilter}
            />
          </span>
          <span>
            <Selector
              id={"actor-name"}
              label={"Actor Name"}
              value={props.nameFilter}
              multiple={true}
              fieldToFilter={[...props.actors, "All"]}
              handleFilter={props.handleNameFilter}
            />
          </span>
          <span>
            <Selector
              id={"Status"}
              label={"Status"}
              value={props.statusFilter}
              multiple={false}
              fieldToFilter={props.sketchStatus}
              handleFilter={props.handleStatusFilter}
            />
          </span>
          <span><Button variant="contained" onClick={handleFilterReset}>Reset Filters</Button></span>
        </div>
      </div>
    </>
  );
};

export default Filters;
