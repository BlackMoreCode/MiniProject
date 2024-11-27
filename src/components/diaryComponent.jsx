import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`

export const Div = styled.div`
  &.phone-container {
    width: 500px;
    height: 100%;
    border: 2px solid black;
    display: flex;
    flex-direction: column;
  }

  &.phone-header {
    display: flex;

  }

  
`