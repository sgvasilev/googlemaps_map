import React from "react"

const RouteInput = ({ handleChange, thisInput }) => {
  return (
    <>
      <input
        onChange={(e) => {
          handleChange(e.target.value)
        }}
        placeholder="Новая точка маршрута"
        className="userrouting__input"
        type="text"
        ref={thisInput}
        id="autocomplete"
        data-testid="input"
      />
    </>
  )
}

export default RouteInput
