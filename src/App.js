import "./App.css"
import React from "react"
import { UserMarkersProvider } from "./context/userMarkers"
import { Wrapper, Status } from "@googlemaps/react-wrapper"

import MapAndMarkers from "./components/MapAndMarkers/MapAndMarkers"
import Loader from "./components/Loader/Loader"
import Error from "./components/Error/Error"

function App() {
  const render = (status = Status.SUCCESS) => {
    switch (status) {
      case Status.LOADING:
        return <Loader />
      case Status.FAILURE:
        return <Error />
      case Status.SUCCESS:
        return (
          <UserMarkersProvider data-testid="success">
            <MapAndMarkers />
          </UserMarkersProvider>
        )
      default:
        return <Loader />
    }
  }

  return <Wrapper libraries={["places"]} render={render} apiKey=""></Wrapper>
}

export default App
