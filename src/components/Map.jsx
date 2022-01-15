import { useContext, useEffect } from "react"
import styled from "styled-components"

import userMarkerContext from "../context/userMarkers"
import "./map.css"
const Container = styled.div`
  width: 80%;
  display: flex;
  border: 2px solid red;
  @media screen and (max-width: 500px) {
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: 70vh;
  }
`

const Map = ({ data }) => {
  //const { userMarkers } = useContext(userMarkerContext)
  const myMarker = async () => {
    let google = window.google
    const a = await data
    console.log(a)
    const markerino = new google.maps.Marker({
      position: { lat: -33.89, lng: 151.274 },
      map: data,
    })
  }
  setTimeout(() => {
    myMarker()
  }, 1000)
  console.log("map render")
  return (
    <Container>
      <div id="map"></div>
    </Container>
  )
}

export default Map
