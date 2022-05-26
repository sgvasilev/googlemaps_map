import React, { useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"

import userMarkerContext from "../../context/userMarkers"
import { Container } from "./Map.components"

const Map = ({ onClick, onIdle, children, style, ...options }) => {
  const [poly, setPoly] = useState(null)
  const { map, setMap, getCoordinates, userMarkers } =
    useContext(userMarkerContext)
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          center: options.center,
          zoom: 10,
        })
      )
    }
  }, [ref, setMap, getCoordinates, options.center, map])
  useEffect(() => {
    let poly = new window.google.maps.Polyline({
      strokeColor: "#58FA58",
      strokeOpacity: 1.0,
      strokeWeight: 3,
    })
    setPoly(poly)
  }, [])

  let path = []
  userMarkers.forEach((marker) => {
    path.push(marker.position)
  })

  for (let i = 0; i < userMarkers.length; i++) {
    if (JSON.stringify(userMarkers[i].position) !== JSON.stringify(path[i])) {
      path[i] = userMarkers[i].position
    }
  }
  if (poly) {
    poly.setMap(null)
    poly.setPath(path)
    poly.setMap(map)
  }

  return (
    <Container ref={ref} data-testid="map" style={style}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { map })
      )}
    </Container>
  )
}

export default Map
