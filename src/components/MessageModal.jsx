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
  const onClose = useRef(null);

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
      if (onClose.current) onClose.current();
    },
    setOnClose(callback = null) {
      if (callback) onClose.current = callback;
    },
  }));

  return (
    <ModalOverlay ref={modalOverlayElement}>
      <ModalContents>
        <div>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div>
          <button
            onClick={() => {
              ref?.current?.disable();
            }}
          >
            확인
          </button>
        </div>
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
    font-size: 0.95rem;
  }

  div:last-child {
    display: flex;
    justify-content: center;
  }

  button {
    width: 40%;

    padding: 10px 0;

    background-color: #e8e8e8;

    border: 0;
    border-radius: 10px;

    color: #505050;
    font-weight: bold;
  }

  button:focus,
  button:hover,
  button:active {
    background-color: #d8d8d8;
  }

  button:active {
    transform: scale(0.99);
  }
`;

export default MessageModal;
