import React, { useState } from "react";
import styled from "styled-components";

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #333;
  color: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  z-index: 1000;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
`;

const Button = styled.button`
  background: #555;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px 5px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #666;
  }
`;

const Modal = ({ date, closeModal }) => {
  const [time, setTime] = useState({ start: "", end: "" });
  const [alarm, setAlarm] = useState("");

  const handleSave = () => {
    console.log({ date, time, alarm });
    closeModal();
  };

  return (
    <>
      <Backdrop onClick={closeModal} />
      <ModalWrapper>
        <h2>Event on {date}</h2>
        <label>Start Time:</label>
        <Input
          type="time"
          value={time.start}
          onChange={(e) => setTime({ ...time, start: e.target.value })}
        />
        <label>End Time:</label>
        <Input
          type="time"
          value={time.end}
          onChange={(e) => setTime({ ...time, end: e.target.value })}
        />
        <label>Alarm:</label>
        <Input
          type="text"
          placeholder="e.g., 15 mins before"
          value={alarm}
          onChange={(e) => setAlarm(e.target.value)}
        />
        <div>
          <Button onClick={handleSave}>Save</Button>
          <Button onClick={closeModal}>Cancel</Button>
        </div>
      </ModalWrapper>
    </>
  );
};

export default Modal;
