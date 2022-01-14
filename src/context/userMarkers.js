import { createContext, useState } from "react"

const userMarkerContext = createContext()

export const UserMarkersProvider = ({ children }) => {
  const [userMarkers, setUserMarkers] = useState([])
  const [marker, setMarker] = useState("")
  const addMarker = (newMarker) => {
    setUserMarkers([...userMarkers, newMarker])
  }
  const deleteMarker = (id) => {
    setUserMarkers(userMarkers.filter((marker) => marker.id !== id))
  }

  return (
    <userMarkerContext.Provider
      value={{
        userMarkers,
        addMarker,
        marker,
        setMarker,
        setUserMarkers,
        deleteMarker,
      }}
    >
      {children}
    </userMarkerContext.Provider>
  )
}

export default userMarkerContext
