import React, { useContext } from "react"
import "../../App.css"
import userMarkerContext from "../../context/userMarkers"
import { MdDisabledByDefault } from "react-icons/md"

import { StyledContainer, StyledCard, StyledButton } from "./Card.components"

const Card = ({ el }) => {
  const { deleteMarker } = useContext(userMarkerContext)
  return (
    <StyledContainer>
      <StyledCard data-testid="card-name" className="userrouting__markers">
        {el.description.length < 40
          ? el.description
          : el.description.slice(0, 37) + "..."}
      </StyledCard>
      <StyledButton
        data-testid="delete-button"
        onClick={() => {
          deleteMarker(el.id)
        }}
      >
        <MdDisabledByDefault fill="#fa8585" size={16}></MdDisabledByDefault>
      </StyledButton>
    </StyledContainer>
  )
}

export default Card
