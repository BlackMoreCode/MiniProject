import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
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

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  text-align: center;
`;

const CoinfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <p>{message}</p>
        <div style={{ marginTop: "20px" }}>
          <button style={{ marginRight: "10px" }} onClick={onConfirm}>
            네
          </button>
          <button onClick={onClose}>아니오</button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default CoinfirmationModal;
