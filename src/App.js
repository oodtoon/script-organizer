import { useEffect, useState } from "react";
import { Container } from "@mui/system";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Sketch from "./components/Sketch";
import NewSketch from "./components/NewSketch";
import Filters from "./components/Filters";
import "./App.css";

const exScript = {
  title: "crazy times!",
  scenes: [
    {
      sketch: "hello! hello!",
      sketchTitle: "Crazy",
      actors: ["sean", "beth"],
      shots: "pan up",
      completed: false,
      visible: true,
      id: "1",
    },
    {
      sketch: "bye bye bye!",
      sketchTitle: "time",
      actors: ["gwen", "stephan", "gringo"],
      shots: "pan down",
      completed: false,
      visible: true,
      id: "2",
    },
    {
      sketch: "geroge you bastard",
      sketchTitle: "once crazy",
      actors: ["gringo", "beth"],
      shots: "pan left",
      completed: false,
      visible: true,
      id: "3",
    },
    {
      sketch: "flamoyantly writing this because that's a fun word!",
      sketchTitle: "always crazy",
      actors: ["Rosco", "Turner", "Astor"],
      shots: "pan right",
      completed: false,
      visible: true,
      id: "4",
    },
    {
      sketch: "At the end eh?",
      sketchTitle: "verruckt",
      actors: ["sean", "beth"],
      shots: "full tablle",
      completed: true,
      visible: true,
      id: "5",
    },
  ],
};

const getRandomId = () => {
  return (Math.random() * 100000000).toString();
};

function App() {
  const [script, setScript] = useState(exScript);
  const [sketch, setSketch] = useState("");
  const [actors, setActors] = useState([]);
  const [shots, setShots] = useState("");
  const [sketchTitle, setSketchTitle] = useState("");
  const [isFilterChange, setIsFilterChange] = useState(false);

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

  const totalActorsInScene = script.scenes.map((scene) => scene.actors.length);
  const uniqueTotalActors = [...new Set(totalActorsInScene)].sort();

  const actorsInScene = script.scenes.flatMap((scene) => scene.actors);
  const uniqueActorsInScene = [...new Set(actorsInScene)];

  const sketchStatus = ["Complete", "Incomeple", "All"];

  const [numberFilter, setNumberFilter] = useState("");
  const [nameFilter, setNameFilter] = useState([]);
  const [statusFilter, setStatusFiler] = useState("All");

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
  }, [isFilterChange, numberFilter, nameFilter, statusFilter, script.scenes]);

  const handleSketchTitle = (event) => {
    setSketchTitle(event.target.value);
  };

  const handleSketch = (event) => {
    setSketch(event.target.value);
  };

  const handleShots = (event) => {
    setShots(event.target.value);
  };

  const handleActors = (event, index) => {
    const enteredData = [...actors];
    enteredData[index] = event.target.value;
    setActors(enteredData);
  };

  const newSketch = (event) => {
    event.preventDefault();

    const sceneObj = {
      sketch: sketch,
      sketchTitle: sketchTitle,
      actors: actors,
      shots: shots,
      id: getRandomId(),
    };

    const newScene = { ...script, scenes: script.scenes.concat(sceneObj) };
    setScript(newScene);
    setActors([1]);
    setShots("");
    setSketch("");
  };

  const completedScenes = script.scenes.filter(
    (sketch) => sketch.completed === true
  ).length;

  return (
    <div>
      <Container>
        <Filters
          actors={uniqueActorsInScene}
          total={uniqueTotalActors}
          sketchStatus={sketchStatus}
          numberFilter={numberFilter}
          nameFilter={nameFilter}
          statusFilter={statusFilter}
          setIsFilterChange={setIsFilterChange}
          setStatusFiler={setStatusFiler}
          setNumberFilter={setNumberFilter}
          setNameFilter={setNameFilter}
          handleNameFilter={handleNameFilter}
          handleNumberFilter={handleNumberFilter}
          handleStatusFilter={handleStatusFilter}
        />
        <div className="scene-container">
          <h1 className="title">{script.title}</h1>
          <div>
            <span>total scenes: {script.scenes.length}</span>{" "}
            <span>scenes completed: {completedScenes}</span>{" "}
            <span>
              scenes remaining: {script.scenes.length - completedScenes}
            </span>
          </div>

          <DragDropContext onDragEnd={handleDragDrop}>
            <Droppable droppableId="ROOT" type="group">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {script.scenes !== undefined &&
                    script.scenes.map((sketch, index) => {
                      return (
                        <Draggable
                          draggableId={sketch.id}
                          key={sketch.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              {...provided.draggableProps}
                              ref={provided.innerRef}
                            >
                              <Sketch
                                key={sketch.id}
                                sketch={sketch}
                                provided={provided}
                              />
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        <NewSketch
          sketch={sketch}
          setSketch={setSketch}
          actors={actors}
          setActors={setActors}
          shots={shots}
          setShots={setShots}
          sketchTitle={sketchTitle}
          setSketchTitle={setSketchTitle}
          handleActors={handleActors}
          handleSketch={handleSketch}
          handleShots={handleShots}
          handleSketchTitle={handleSketchTitle}
          newSketch={newSketch}
        />
      </Container>
    </div>
  );
}

export default App;
