import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Div = styled.div`
  &.phone-container {
    width: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For Internet Explorer and Edge */
    gap: 10px;
  }

  // dark 모드
  &.phone-container-dark {
    width: 500px;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For Internet Explorer and Edge */
    gap: 10px;

    background-color: black;
    color: white;
    input {
      background-color: #444;
      color: white;
      &::placeholder {
        color: #ccc;
      }
    }
    textarea {
      background-color: #444;
      color: white;
    }
    .buttonBox {
      div {
        background-color: #ccc;
        color: black;
        &:hover {
          background-color: #eee;
        }
      }
    }
  }

  // 폰트
  &.font-default {
    font-family: "Nanum Gothic", sans-serif;
    input,
    textarea,
    button,
    div {
      font-family: "Nanum Gothic", sans-serif;
    }
  }
  &.font-do-hyeon {
    font-family: "Do Hyeon", sans-serif;
    input,
    textarea,
    button,
    div {
      font-family: "Do Hyeon", sans-serif;
    }
  }
  &.font-gowun-dodum {
    font-family: "Gowun Dodum", sans-serif;
    input,
    textarea,
    button,
    div {
      font-family: "Gowun Dodum", sans-serif;
    }
  }
  &.font-hi-melody {
    font-family: "Hi Melody", sans-serif;
    input,
    textarea,
    button,
    div {
      font-family: "Hi Melody", sans-serif;
    }
  }
  &.font-jua {
    font-family: "Jua", sans-serif;
    input,
    textarea,
    button,
    div {
      font-family: "Jua", sans-serif;
    }
  }

  &.diary-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &.diary-header p {
    width: 50%;
    background-color: #ddd;
    padding: 5px;
    text-align: center;
    border-radius: 10px;
  }

  &.diary-header button {
    border: none;
    width: 30px;
    height: 30px;
    background-color: #ddd;
    border-radius: 100%;
  }

  .buttonBox {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    div {
      cursor: pointer;
    }
  }

  /* .code-section button {
    width: 35%;
    height: 30px;
    border: none;
    border-radius: 10px;
    margin: 10px 0;
    background-color: #ddd;
    &:hover {
      background-color: #eee;
    }
  } */
`;

export const Form = styled.form`
  border: 1px solid black;
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  .diary-title {
    width: 100%;
    border: none;
    border-radius: 5px;
    background-color: #ddd;
    padding: 5px;
    font-size: 1em;
    box-sizing: border-box;
  }
  .diary-date {
    width: 100%;
    border: none;
    border-radius: 5px;
    background-color: #ddd;
    padding: 5px;
    font-size: 1.1em;
    box-sizing: border-box;
  }
  .diary-desc {
    width: 100%;
    min-height: 100px;
    border: none;
    border-radius: 5px;
    background-color: #ddd;
    padding: 5px;
    box-sizing: border-box;
    resize: none;
    overflow: auto;
    scrollbar-width: none;
  }
  .diary-coding-header {
    display: flex;
    align-items: center;
  }
  .diary-coding-header button {
    width: 30px;
    height: 30px;
    background-color: transparent;
    border-radius: 10px;
    border: 1px solid rgb(50, 150, 255);
    color: rgb(50, 150, 255);
    &:hover {
      background-color: #eee;
    }
  }
  .diary-coding-header p {
    padding: 0 10px;
  }
  .coding-desc {
    width: 100%;
    min-height: 100px;
    border: none;
    border-radius: 5px;
    background-color: #ddd;
    padding: 5px;
    box-sizing: border-box;
    resize: none;
    overflow: auto;
    scrollbar-width: none;
  }
`;

export const InputGeneral = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  width: 100%;
  margin-bottom: 5px;
`;
export const TextArea = styled.textarea`
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  margin-bottom: 10px;
  resize: none; /* 수동으로 리사이징 막기 */
  overflow: hidden; /* 오버플로우 숨겨서 스크롤바 막기 */
  font-size: 14px; /* Adjust font size for better usability */
  box-sizing: border-box; /* Include padding and border in width/height*/
`;

// 태그 관련

export const TagInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  width: 100%;
  resize: none; /* 수동으로 리사이징 막기 */
  overflow: hidden; /* 오버플로우 숨겨서 스크롤바 막기 */
  font-size: 14px;
  box-sizing: border-box;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

// 추가된 태그들을 위한 CSS
export const TagItem = styled.div`
  background-color: ${(props) => (props.isDark ? "#aaa" : "#494a50")};
  color: ${(props) => (props.isDark ? "black" : "white")};
  padding: 5px 10px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  margin: 4px;
  font-size: 14px;
  &:hover {
    background-color: ${(props) => (props.isDark ? "#eee" : "#292a2d")};
    font-weight: bold;
  }

  button {
    margin-left: 8px;
    background: none;
    background-color: transparent;
    border: none;
    color: ${(props) => (props.isDark ? "black" : "white")};
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
`;

//Modal 관련

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

// 범용 버튼

// 태그를 추가하는 버튼의 CSS --> 범용 추가로 변환? --> 일반 디자인으로 전환?
export const GeneralConfirmation = styled.button`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 10px;
  margin: 8px 0;
  background-color: ${(props) => (props.isDark ? "#777" : "#f4f4f6")};
  color: ${(props) => (props.isDark ? "black" : "#66666e")};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => (props.isDark ? "#aaa" : "#dadadb")};
    font-weight: bold;
  }
`;

// 범용 긴 삭제 버튼 CSS
export const GeneralRmvBtn = styled.button`
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  border-radius: 10px;
  margin: 8px 0;
  background-color: #af4c4c;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #883a3a;
    font-weight: bold;
  }
`;

// 범용 작은 저장/확인 버튼
export const ConfirmBtn = styled.div`
  align-content: center;
  text-align: center;
  color: white;
  width: 45%;
  height: 30px;
  border: none;
  border-radius: 10px;
  margin: 10px 0;
  background-color: #494a50;
  &:hover {
    background-color: #292a2d;
    font-weight: bold;
  }
`;

// 범용 작은 삭제 버튼
export const RmvBtnS = styled.div`
  align-content: center;
  text-align: center;
  color: white;
  width: 45%;
  height: 30px;
  border: none;
  border-radius: 10px;
  margin: 10px 0;
  background-color: #af4c4c;
  &:hover {
    background-color: #883a3a;
    font-weight: bold;
  }
`;

// 범용 푸른 기타 버튼 --> 그냥 일단 급하니까 회색처리 ㄱㄱ.
export const EtcBtn = styled.div`
  align-content: center;
  text-align: center;
  color: white;
  width: 45%;
  height: 30px;
  border: none;
  border-radius: 10px;
  margin: 10px 0;
  background-color: #494a50;
  &:hover {
    background-color: #292a2d;
    font-weight: bold;
  }
`;
