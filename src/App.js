import { useEffect, useState } from "react";
import { Container } from "@mui/system";
import FilmingScript from "./components/routes/FilmingScript";
import HomeScreen from "./components/routes/HomeScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CreateNewScript from "./components/routes/CreateNewScript";
import scriptService from "./services/scripts";
import Footer from "./components/Footer";

const getRandomId = () => {
  return (Math.random() * 100000000).toString();
};

function App() {
  const [allScripts, setAllScripts] = useState([]);

  useEffect(() => {
    scriptService.getAll().then((response) => {
      setAllScripts(response.data);
    });
  }, []);

  const [script, setScript] = useState();

  useEffect(() => {
    const selectedId = localStorage.getItem("selectedScript");

    if (selectedId) {
      const parsedId = JSON.parse(selectedId);

      const selectedScript = allScripts.find(
        (script) => script.id === parsedId
      );

      setScript(selectedScript);
    }
  }, [allScripts]);

  const [sketch, setSketch] = useState("");
  const [actors, setActors] = useState([""]);
  const [totalActors, setTotalActors] = useState([1]);
  const [shots, setShots] = useState("");
  const [sketchTitle, setSketchTitle] = useState("");
  const [location, setLocation] = useState("");

  const [isFilterChange, setIsFilterChange] = useState(false);
  const [isDraft, setIsDraft] = useState(false);

  const [uniqueTotalActors, setUniqueTotalActors] = useState([]);
  const [uniqueActorsInScene, setUniqueActorsInScene] = useState([]);
  const [uniqueLocations, setUniqueLocations] = useState([]);

  const handleDragDrop = (result) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedScenes = [...script.scenes];
      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedSketch] = reorderedScenes.splice(sourceIndex, 1);
      reorderedScenes.splice(destinationIndex, 0, removedSketch);

      const updatedScript = {
        title: script.title,
        scenes: reorderedScenes,
      };

      return setScript(updatedScript);
    }
  };

  useEffect(() => {
    if (script && script.scenes) {
      const totalActorsInScene = script.scenes.map(
        (scene) => scene.actors.length
      );
      setUniqueTotalActors([...new Set(totalActorsInScene)].sort());

      const actorsInScene = script.scenes.flatMap((scene) => scene.actors);
      setUniqueActorsInScene([...new Set(actorsInScene)]);

      const sketchLocations = script.scenes.map((scene) => scene.location);
      setUniqueLocations([...new Set(sketchLocations)].sort());
    }
  }, [script]);

  const sketchStatus = ["Complete", "Incomeple", "All"];

  const [numberFilter, setNumberFilter] = useState("");
  const [nameFilter, setNameFilter] = useState([]);
  const [statusFilter, setStatusFiler] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  const handleNumberFilter = (event) => {
    setNumberFilter(event.target.value);
    setIsFilterChange(true);
  };

  const handleStatusFilter = (event) => {
    setStatusFiler(event.target.value);
    setIsFilterChange(true);
  };

  const handleNameFilter = (event) => {
    const {
      target: { value },
    } = event;
    setNameFilter(typeof value === "string" ? value.split(",") : value);
    setIsFilterChange(true);
  };

  const handleLocationFilter = (event) => {
    setLocationFilter(event.target.value);
    setIsFilterChange(true);
  };

  useEffect(() => {
    if (isFilterChange) {
      const filteredArray = script.scenes.map((scene) => {
        let isVisible = true;

        if (statusFilter === "All") {
          isVisible = true;
        } else if (statusFilter === "Complete") {
          isVisible = scene.completed === true ? true : false;
        } else {
          isVisible = scene.completed === false ? true : false;
        }

        if (isVisible && numberFilter !== "" && numberFilter !== "All") {
          isVisible = scene.actors.length === parseInt(numberFilter);
        }

        if (isVisible && nameFilter.length > 0) {
          if (nameFilter.includes("All")) {
            isVisible = true;
          } else {
            isVisible = nameFilter.every((name) => scene.actors.includes(name));
          }
        }

        if (isVisible && locationFilter !== "All" && locationFilter !== "") {
          isVisible = scene.location === locationFilter ? true : false;
        }

        return {
          ...scene,
          visible: isVisible,
        };
      });

      setScript((prevScript) => ({
        ...prevScript,
        scenes: filteredArray,
      }));

      setIsFilterChange(false);
    }
  }, [isFilterChange, numberFilter, nameFilter, statusFilter, script]);

  const handleSketchTitle = (event) => {
    setSketchTitle(event.target.value);
  };

  const handleSketch = (event) => {
    setSketch(event.target.value);
  };

  const handleShots = (event) => {
    setShots(event.target.value);
  };

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleActors = (event, index) => {
    const enteredData = [...actors];
    enteredData[index] = event.target.value;
    setActors(enteredData);
  };

  const newSketch = (event, id) => {
    event.preventDefault();

    const sceneObj = {
      sketchTitle: sketchTitle,
      sketch: sketch,
      actors: actors,
      location: location,
      shots: shots,
      completed: false,
      visible: true,
      id: getRandomId(),
    };

    const scriptToUpdate = allScripts.find((script) => script.id === id);
    const newScene = {
      ...scriptToUpdate,
      scenes: scriptToUpdate.scenes.concat(sceneObj),
    };
    scriptService.update(id, newScene).then((response) => {
      setScript(response.data);
    });
    setActors([""]);
    setShots("");
    setSketch("");
    setSketchTitle("");
    setTotalActors([1]);
    setLocation("");
  };

  return (
    <div>
      <Container>
        <Router>
          <Routes>
            <Route
              path="/script"
              element={
                <FilmingScript
                  uniqueActors={uniqueActorsInScene}
                  total={uniqueTotalActors}
                  sketchStatus={sketchStatus}
                  numberFilter={numberFilter}
                  nameFilter={nameFilter}
                  statusFilter={statusFilter}
                  locationFilter={locationFilter}
                  sketch={sketch}
                  actors={actors}
                  shots={shots}
                  sketchTitle={sketchTitle}
                  script={script}
                  totalActors={totalActors}
                  isDraft={isDraft}
                  allScripts={allScripts}
                  location={location}
                  uniqueLocations={uniqueLocations}
                  setLocation={setLocation}
                  handleLocation={handleLocation}
                  setAllScripts={setAllScripts}
                  setIsDraft={setIsDraft}
                  setIsFilterChange={setIsFilterChange}
                  setStatusFiler={setStatusFiler}
                  setNumberFilter={setNumberFilter}
                  setNameFilter={setNameFilter}
                  setLocationFilter={setLocationFilter}
                  handleNameFilter={handleNameFilter}
                  handleNumberFilter={handleNumberFilter}
                  handleStatusFilter={handleStatusFilter}
                  handleLocationFilter={handleLocationFilter}
                  setSketch={setSketch}
                  setActors={setActors}
                  setTotalActors={setTotalActors}
                  setShots={setShots}
                  setSketchTitle={setSketchTitle}
                  handleActors={handleActors}
                  handleSketch={handleSketch}
                  handleShots={handleShots}
                  handleSketchTitle={handleSketchTitle}
                  handleDragDrop={handleDragDrop}
                  setScript={setScript}
                  newSketch={newSketch}
                />
              }
            />
            <Route
              path="/"
              element={
                <HomeScreen
                  allScripts={allScripts}
                  setScript={setScript}
                  setIsDraft={setIsDraft}
                />
              }
            />
            <Route
              path="newscript"
              element={
                <CreateNewScript
                  totalActors={totalActors}
                  sketch={sketch}
                  actors={actors}
                  shots={shots}
                  sketchTitle={sketchTitle}
                  isDraft={isDraft}
                  script={script}
                  allScripts={allScripts}
                  setAllScripts={setAllScripts}
                  setIsDraft={setIsDraft}
                  setTotalActors={setTotalActors}
                  setShots={setShots}
                  setSketch={setSketch}
                  setActors={setActors}
                  setSketchTitle={setSketchTitle}
                  handleActors={handleActors}
                  handleSketch={handleSketch}
                  handleShots={handleShots}
                  handleSketchTitle={handleSketchTitle}
                  handleDragDrop={handleDragDrop}
                  setScript={setScript}
                  newSketch={newSketch}
                />
              }
            />
          </Routes>
        </Router>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
