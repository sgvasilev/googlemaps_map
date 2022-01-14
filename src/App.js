import "./App.css"
import React, { useEffect, useState } from "react"
import Form from "./components/Form"
import Map from "./components/Map"
import { UserMarkersProvider } from "./context/userMarkers"
import MapLoader from "./components/MapLoader"

function App() {
  useEffect(() => {
    let data = MapLoader()
    console.log(data, "data")
  }, [])
  console.log("app render")
  return (
    <UserMarkersProvider>
      <section className="userrouting">
        <Form />
        <Map />
      </section>
    </UserMarkersProvider>
  )
}

export default App
