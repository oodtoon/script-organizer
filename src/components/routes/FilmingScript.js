import { useEffect, useState } from "react";
import Filters from "../Filters";
import NewSketch from "../NewSketch";
import Sketch from "../Sketch";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import HomeButton from "../HomeButton";
import Delete from "../Delete";

const FilmingScript = (props) => {
  const [completedScenes, setCompletedScenes] = useState(0);

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
      <HomeButton place="Home" />
      {props.isDraft === false && (
        <Filters
          actors={props.uniqueActors}
          total={props.total}
          sketchStatus={props.sketchStatus}
          numberFilter={props.numberFilter}
          nameFilter={props.nameFilter}
          statusFilter={props.statusFilter}
          setIsFilterChange={props.setIsFilterChange}
          setStatusFiler={props.setStatusFiler}
          setNumberFilter={props.setNumberFilter}
          setNameFilter={props.setNameFilter}
          handleNameFilter={props.handleNameFilter}
          handleNumberFilter={props.handleNumberFilter}
          handleStatusFilter={props.handleStatusFilter}
        />
      )}
      <div className="scene-container">
        <h1 className="title">{props.script.title}</h1>
        {props.isDraft === false && (
          <div>
            <span>total scenes: {props.script.scenes.length}</span>{" "}
            <span>scenes completed: {completedScenes}</span>{" "}
            <span>
              scenes remaining: {props.script.scenes.length - completedScenes}
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
      />
      <Delete script={props.script} setAllScripts={props.setAllScripts} allScripts={props.allScripts}/>
    </div>
  );
};

export default FilmingScript;