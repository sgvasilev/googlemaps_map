import React, { useContext } from "react"
import userMarkerContext from "../../context/userMarkers"
import Map from "../Map/Map"
import Form from "../Form/Form"
import Marker from "../Marker/Marker"

const MapAndMarkers = () => {
  const { userMarkers } = useContext(userMarkerContext)

  const center = { lat: 55.751244, lng: 37.618423 }
  const zoom = 10
  return (
    <section className="userrouting">
      <Form />
      <Map center={center} zoom={zoom}>
        {userMarkers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            description={marker.description}
            id={marker.id}
          />
        ))}
      </Map>
    </section>
  )
}

export default MapAndMarkers
