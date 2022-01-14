import React, { useContext } from "react"
import styled from "styled-components"
import "../App.css"
import userMarkerContext from "../context/userMarkers"
import { MdDisabledByDefault } from "react-icons/md"

const StyledCard = styled.div`
  border: 2px solid #3f3f3f;
  border-radius: 5px;
  width: 100%;

  padding: 8px 8px;
  white-space: pre-wrap;
  word-wrap: break-word;
  background: #edf5e1;
`
const StyledContainer = styled.div`
  gap: 4px;
  width: 331px;
  display: flex;
  flex-direction: row;
`
const StyledButton = styled.button`
  background: transparent;
  border: none;
  //border-radius: 4px;
  cursor: pointer;
`

const Card = ({ el }) => {
  const { deleteMarker } = useContext(userMarkerContext)
  return (
    <StyledContainer>
      <StyledCard className="userrouting__markers">{el.place}</StyledCard>
      <StyledButton
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
