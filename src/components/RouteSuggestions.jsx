import React from "react"

const RouteSuggestions = ({ prediction, handeChoseSelection }) => {
  return (
    <>
      <div
        data-testid="user_suggestions"
        onClick={(e) => handeChoseSelection(e, prediction)}
        className="userrouting__suggestions"
      >
        {prediction.description.length > 50
          ? prediction.description.toString().slice(0, 50)
          : prediction.description}
      </div>
    </>
  )
}

export default RouteSuggestions
