import "./App.css"
import React, { useEffect, useState } from "react"
import Form from "./components/Form"
import Map from "./components/Map"
import { UserMarkersProvider } from "./context/userMarkers"
import MapLoader from "./components/MapLoader"

function App() {
  let map
  const myMapLoader = async () => {
    return (map = await MapLoader())
  }
  let data = myMapLoader()

  return (
    <UserMarkersProvider>
      <section className="userrouting">
        <Form />
        <Map data={data} />
      </section>
    </UserMarkersProvider>
  )
}

export default App
