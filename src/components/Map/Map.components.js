import styled from "styled-components"

export const Container = styled.div`
  width: 80%;
  display: flex;
  border: 1px solid rgb(200, 220, 200);
  border-radius: 10px;
  @media screen and (max-width: 900px) {
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: 70vh;
  }
`
