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

const Map = () => {
  //const { userMarkers } = useContext(userMarkerContext)
  console.log("map render")
  return (
    <Container>
      <div id="map"></div>
    </Container>
  )
}

export default Map
