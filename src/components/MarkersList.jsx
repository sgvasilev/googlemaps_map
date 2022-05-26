import React, { useContext } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import Card from "./Card/Card"
import "../App.css"
import userMarkerContext from "../context/userMarkers"

const MarkersList = () => {
  const { userMarkers, reorderMarkers } = useContext(userMarkerContext)
  function dragEndHandler(result) {
    if (!result.destination) {
      return
    }
    const items = Array.from(userMarkers)
    const [reorder] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorder)
    reorderMarkers(items)
  }
  return (
    <DragDropContext onDragEnd={dragEndHandler}>
      <Droppable droppableId="markers">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ listStyle: "none", paddingInlineStart: "8px" }}
          >
            {userMarkers.map((el, index) => {
              return (
                <Draggable
                  index={index}
                  draggableId={el.id.toString()}
                  key={el.id}
                >
                  {(provided) => (
                    <li
                      className="marginFix"
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      key={el.id}
                    >
                      <Card el={el}></Card>
                    </li>
                  )}
                </Draggable>
              )
            })}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default MarkersList
