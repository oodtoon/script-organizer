import Selector from "./Selector";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";


const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "black",
  borderRadius: "0px",
  fontWeight: "700",
  "&:hover": {
    backgroundColor: "white",
    border: "3px solid black",
    color: "black", 
    boxShadow: ".5em .5em hotpink"
  },
}));



const Filters = (props) => {


  const handleFilterReset = () => {
    props.setNameFilter([]);
    props.setStatusFiler("All");
    props.setNumberFilter("");
    props.setLocationFilter("All");
    props.setIsFilterChange(true);
  };

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
          <span>
            <Selector
              id={"location"}
              label={"Location"}
              value={props.locationFilter}
              multiple={false}
              fieldToFilter={[...props.locations, "All"]}
              handleFilter={props.handleLocationFilter}
            />
          </span>
          <span className="filter-btn">
            <CustomButton
              variant="contained"
              onClick={handleFilterReset}
              
              
            >
              Reset Filters
            </CustomButton>
          </span>
        </div>
      </div>
    </>
  );
};

export default Filters;
