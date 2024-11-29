import styled from "styled-components";
import leftArrowIcon from "../assets/icons/left-arrow.png";

export const PrevPageButton = () => {
  return (
    <PrevButtonContainer>
      <img src={leftArrowIcon} alt="뒤로가기" />
    </PrevButtonContainer>
  );
};

const PrevButtonContainer = styled.div`
  width: 30px;
  height: 30px;

  border: 2px solid black;
  border-radius: 50%;

  cursor: pointer;

  img {
    width: 100%;
  }
`;