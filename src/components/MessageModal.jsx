import React, {
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import styled from "styled-components";

const MessageModal = forwardRef((props, ref) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const modalOverlayElement = useRef(null);

  useImperativeHandle(ref, () => ({
    enable(newTitle, newDescription) {
      setTitle(newTitle);
      setDescription(newDescription);
      modalOverlayElement.current.style.display = "block";
    },
    disable() {
      modalOverlayElement.current.style.display = "none";
      setTitle("");
      setDescription("");
    },
  }));

  return (
    <ModalOverlay ref={modalOverlayElement}>
      <ModalContents>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <button onClick={() => ref?.current?.disable()}>확인</button>
      </ModalContents>
    </ModalOverlay>
  );
});

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  display: none;

  width: 100%;
  height: 100%;

  z-index: 255;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContents = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 80%;
  height: 30%;

  padding: 20px;

  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    margin-bottom: 20px;

    text-align: center;
  }

  p {
    font-size: 0.9rem;
  }

  button {
    width: 100%;
  }
`;

export default MessageModal;
