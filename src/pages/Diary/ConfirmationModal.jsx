import React from "react";
import * as Styles from "./diaryComponent";

const ConfirmationModal = ({
  isOpen,
  message,
  confirmText = "네",
  cancelText = "아니오",
  onConfirm,
  onCancel,
  singleButton = false,
}) => {
  if (!isOpen) return null;

  // 싱글 버튼이냐 아니냐에 따라서 CSS 처리 다르게 됩니다.
  return (
    <Styles.ModalOverlay>
      <Styles.ModalContent>
        <p>{message}</p>
        <div style={{ marginTop: "20px" }}>
          <button
            onClick={onConfirm}
            style={{
              backgroundColor: singleButton ? "blue" : "red",
              color: "white",
              border: "none",
              padding: "5px 10px",
              borderRadius: "4px",
              marginRight: singleButton ? "0" : "10px",
            }}
          >
            {confirmText}
          </button>
          {!singleButton && (
            <button
              onClick={onCancel}
              style={{
                backgroundColor: "gray",
                color: "white",
                border: "none",
                padding: "5px 10px",
                borderRadius: "4px",
              }}
            >
              {cancelText}
            </button>
          )}
        </div>
      </Styles.ModalContent>
    </Styles.ModalOverlay>
  );
};

export default ConfirmationModal;
