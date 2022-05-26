import { createContext, useReducer, useState } from "react"
import markersReducer from "../reducers/markersReducer"
const userMarkerContext = createContext()

export const UserMarkersProvider = ({ children }) => {
  const initialState = {
    userMarkers: [],
    marker: [],
  }
  const addMarker = (data) => {
    dispatch({
      type: "ADD_MARKER",
      payload: data,
    })
  }
  const setMarker = (marker) => {
    dispatch({
      type: "MARKER_LIST",
      payload: marker,
    })
  }

  const deleteMarker = (id) => {
    const data = state.userMarkers.filter((el) => el.id !== id)
    console.log("data", data)
    dispatch({
      type: "DELETE_MARKER",
      payload: data,
    })
  }
  const reorderMarkers = (items) => {
    dispatch({
      type: "REORDER_MARKERS",
      payload: items,
    })
  }

  const renewMarker = (id, latLng, newLocation) => {
    const tempData = state.userMarkers.find((marker) => marker.id === id)
    tempData.position = latLng
    if ((newLocation !== null) & (newLocation !== undefined)) {
      tempData.description = newLocation
    }
    const tempIndex = state.userMarkers.findIndex((el) => el.id === id)
    const tempUserMarkers = [...state.userMarkers]
    tempUserMarkers.splice(tempIndex, 1)
    tempUserMarkers.splice(tempIndex, 0, tempData)
    dispatch({
      type: "RENEW_MARKER",
      payload: tempUserMarkers,
    })
  }
  const [map, setMap] = useState()
  const [state, dispatch] = useReducer(markersReducer, initialState)
  return (
    <userMarkerContext.Provider
      value={{
        deleteMarker,
        addMarker,
        reorderMarkers,
        userMarkers: state.userMarkers,
        setMap,
        map,
        marker: state.marker,
        setMarker,
        renewMarker,
      }}
    >
      {children}
    </userMarkerContext.Provider>
  )
}

export default userMarkerContext
