import styled from "styled-components";
import leftArrowIcon from "../assets/icons/left-arrow.png";
import { useNavigate } from "react-router-dom";

export const PrevPageButton = () => {
  // 공용으로 쓰일 버튼 같아서 navigate("/login") 처리 대신  navigate(-1) 처리 했습니다.
  const navigate = useNavigate();
  return (
    <PrevButtonContainer>
      <img src={leftArrowIcon} alt="뒤로가기" onClick={() => navigate(-1)} />
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
