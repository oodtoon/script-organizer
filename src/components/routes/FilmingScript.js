import { useEffect, useState, useRef } from "react";
import Filters from "../Filters";
import NewSketch from "../NewSketch";
import Sketch from "../Sketch";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import HomeButton from "../HomeButton";
import Delete from "../Delete";
import BackToTop from "../BackToTop";
import "../../App.css";

const FilmingScript = (props) => {
  const [completedScenes, setCompletedScenes] = useState(0);

  const [isScroll, setIsScroll] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (isScroll === true) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsScroll(false);
    }
  }, [isScroll]);

  const handleScroll = () => {
    setIsScroll(true);
  };

  useEffect(() => {
    if (props.script) {
      setCompletedScenes(
        props.script.scenes.filter((sketch) => sketch.completed === true).length
      );
    }
  }, [props.script]);

  if (!props.script) {
    return <div>loading one moment</div>;
  }

 

  return (
    <div>
      <div className="home-btn-container" ref={scrollRef}>
        <HomeButton place="Home" />
      </div>
      {props.isDraft === false && (
        <Filters
          actors={props.uniqueActors}
          total={props.total}
          locations={props.uniqueLocations}
          sketchStatus={props.sketchStatus}
          numberFilter={props.numberFilter}
          nameFilter={props.nameFilter}
          statusFilter={props.statusFilter}
          locationFilter={props.locationFilter}
          setIsFilterChange={props.setIsFilterChange}
          setStatusFiler={props.setStatusFiler}
          setNumberFilter={props.setNumberFilter}
          setNameFilter={props.setNameFilter}
          setLocationFilter={props.setLocationFilter}
          handleNameFilter={props.handleNameFilter}
          handleNumberFilter={props.handleNumberFilter}
          handleStatusFilter={props.handleStatusFilter}
          handleLocationFilter={props.handleLocationFilter}
        />
      )}
      <div className="scene-container">
        <div className="script-delete-btn">
          <Delete
            script={props.script}
            setAllScripts={props.setAllScripts}
            allScripts={props.allScripts}
            type={"script"}
          />
        </div>
        <h1 className="title">{props.script.title}</h1>

        {props.isDraft === false && (
          <div className="scene-count">
            <span >total scenes: {props.script.scenes.length}</span>{" "}
            <span >completed: {completedScenes}</span>{" "}
            <span >
              remaining: {props.script.scenes.length - completedScenes}
            </span>
          </div>
        )}
        <DragDropContext onDragEnd={props.handleDragDrop}>
          <Droppable droppableId="ROOT" type="group">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {props.script.scenes !== undefined &&
                  props.script.scenes.map((sketch, index) => {
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
                              script={props.script}
                              setScript={props.setScript}
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
        sketch={props.sketch}
        setSketch={props.setSketch}
        actors={props.actors}
        totalActors={props.totalActors}
        setActors={props.setActors}
        shots={props.shots}
        setShots={props.setShots}
        sketchTitle={props.sketchTitle}
        setSketchTitle={props.setSketchTitle}
        handleActors={props.handleActors}
        handleSketch={props.handleSketch}
        handleShots={props.handleShots}
        handleSketchTitle={props.handleSketchTitle}
        setTotalActors={props.setTotalActors}
        newSketch={props.newSketch}
        script={props.script}
        location={props.location}
        setLocation={props.setLocation}
        handleLocation={props.handleLocation}
      />
      <BackToTop handleScroll={handleScroll}/>
    </div>
  );
};

export default FilmingScript;
