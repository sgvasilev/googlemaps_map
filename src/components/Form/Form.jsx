import "../../App.css"

import React, { useState, useContext } from "react"

import { RiRouteLine as FindRouteIcon } from "react-icons/ri"
import {
  FindRouteButton,
  FormLabel,
  RouteSuggestionsStyleFix,
} from "./Form.components"

import userMarkerContext from "../../context/userMarkers"
import MarkersList from "../MarkersList"
import { useGoogleAutocomplete } from "../../helpers/useGoogleAutocomplete"
import RouteInput from "../RouteInput"
import RouteSuggestions from "../RouteSuggestions"
import { getPlacesDetails } from "../../helpers/getPlacesDetails"

const Form = () => {
  const { addMarker, userMarkers, map } = useContext(userMarkerContext)

  const [searchValue, setSearchValue] = useState("")
  const predictions = useGoogleAutocomplete(searchValue)
  const thisInput = React.createRef()
  const [idlat, setIdLat] = useState({ lat: 55.7532, lng: 37.6204, id: "a" })
  const handleChange = (newPlace) => {
    setSearchValue(newPlace)
  }

  const addMockMarker = (e) => {
    e.preventDefault()
    addMarker({
      id: idlat.id,
      place: `mock data + ${idlat.id}`,
      description: "mock data",
      position: { lat: idlat.lat, lng: idlat.lng },
    })

    setIdLat((prev) => ({
      id: prev.id + "f",
      lat: Number(prev.lat) + 0.002,
      lng: prev.lng + 0.002,
    }))
    setSearchValue("")
  }
  const handeChoseSelection = (e, prediction) => {
    e.preventDefault()
    let latLngResult = getPlacesDetails(prediction, map)
    latLngResult.then((result) => {
      const latLng = { lat: result.lat(), lng: result.lng() }
      const existingMarker = userMarkers.filter(
        (marker) => marker.id === prediction.place_id
      )
      if (existingMarker.length >= 1) return
      addMarker({
        id: prediction.place_id,
        place: prediction.structured_formatting.main_text,
        description: prediction.description,
        position: latLng,
      })
      setSearchValue("")
    })
    thisInput.current.value = ""
  }

  return (
    <div style={{ alignItems: "center" }}>
      <form className="userrouting__form">
        <FormLabel>
          <button
            style={{
              width: "fit-content",
              margin: "0 auto",
              borderRadius: "8px",
              height: "50px",
              cursor: " pointer",
              marginBottom: "16px",
            }}
            onClick={addMockMarker}
          >
            add mock lat lng
          </button>
          <RouteInput
            value={searchValue}
            handleChange={handleChange}
            thisInput={thisInput}
          />
          {searchValue &&
            predictions?.map((prediction) => (
              <RouteSuggestionsStyleFix
                key={prediction.place_id}
                className="userrouting__form_stylefix"
              >
                <RouteSuggestions
                  handeChoseSelection={handeChoseSelection}
                  prediction={prediction}
                />
              </RouteSuggestionsStyleFix>
            ))}
        </FormLabel>
        {/* <FindRouteButton type="submit">
          <FindRouteIcon size={28} />
        </FindRouteButton> */}
      </form>
      <MarkersList />
    </div>
  )
}

export default Form

//   {
//     description: "Боровск военкомат, Ленина площадь, Боровск, Калужская область, Россия"
// matched_substrings: [{…}]
// place_id: "ChIJMQpdkvvPykYRBazMcjH8g34"
// reference: "ChIJMQpdkvvPykYRBazMcjH8g34"
// structured_formatting: {main_text: 'Боровск военкомат', main_text_matched_substrings: Array(1), secondary_text: 'Ленина площадь, Боровск, Калужская область, Россия'}
// terms: (5) [{…}, {…}, {…}, {…}, {…}]
// types: (2) ['point_of_interest', 'establishment']
//   }
