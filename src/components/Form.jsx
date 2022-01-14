import "../App.css"

import axios from "axios"
import React, { useState, useContext, useEffect, useCallback } from "react"
import { v4 as uuidv4 } from "uuid"
import debounce from "lodash.debounce"
import { RiRouteLine } from "react-icons/ri"
import styled from "styled-components"
//import data from "../components/MapLoader"

import userMarkerContext from "../context/userMarkers"
import MarkersList from "./MarkersList"

const Form = () => {
  const thisInput = React.createRef()

  const { setMarker, marker, userMarkers, addMarker, setUserMarkers } =
    useContext(userMarkerContext)

  const _handleSubmit = (e) => {
    e.preventDefault()
    if (marker.toString().trim() === "" || marker.toString().trim() === null)
      return
    else {
      const newMarker = {
        id: uuidv4(),
        place: marker,
      }
      addMarker(newMarker)
      setMarker("")
      thisInput.current.value = ""
    }
  }
  console.log("form render")
  const _handleChange = (newPlace) => {
    setMarker(newPlace)
  }
  const _handleDeb = useCallback(
    debounce(() => {
      //console.log(data)
    }, 900),
    []
  )

  return (
    <div>
      <form onSubmit={_handleSubmit} className="userrouting__form">
        <label
          style={{ display: "flex", flexDirection: "column", width: "300px" }}
        >
          Куда поедем?
          <input
            onChange={(e) => {
              _handleChange(e.target.value)
              _handleDeb()
            }}
            placeholder="Новая точка маршрута"
            className="userrouting__input"
            type="text"
            name="name"
            //value={marker}
            ref={thisInput}
            id="autocomplete"
          />
        </label>

        <button
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
          type="submit"
        >
          <RiRouteLine style={{ position: "absolute" }} size={24} />
        </button>
      </form>
      <MarkersList />
    </div>
  )
}

export default Form
