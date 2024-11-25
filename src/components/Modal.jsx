import React, { useState, useEffect } from "react";
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: none;
  border-radius: 4px;
  resize: none;
`;

const Button = styled.button`
  background-color: #555;
  color: white;
  border: none;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background-color: #666;
  }

  &:disabled {
    background-color: #777;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const Modal = ({ data, onSave, onDelete, closeModal }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState({ start: "", end: "" });
  const [notes, setNotes] = useState("");
  const [alarm, setAlarm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (data.event) {
      setTitle(data.event.title || "");
      setTime(data.event.time || { start: "", end: "" });
      setNotes(data.event.notes || "");
      setAlarm(data.event.alarm || "");
    }
  }, [data]);

  const validateFields = () => {
    if (!title.trim()) {
      setError("Title is required.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSave = () => {
    if (!validateFields()) return;

    const event = {
      id: data.event?.id || new Date().getTime(), // Use existing ID or create a new one
      date: data.date,
      title,
      time,
      notes,
      alarm,
    };
    onSave(event);
  };

  const handleDelete = () => {
    if (data.event) {
      onDelete(data.event);
    }
  };

  return (
    <>
      <Backdrop onClick={closeModal} />
      <ModalWrapper>
        <h2>{data.event ? "Edit Event" : "Add Event"}</h2>
        <label>Title:</label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
        />
        {error && <ErrorText>{error}</ErrorText>}
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
        <label>Notes:</label>
        <TextArea
          rows="4"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add notes about the event..."
        />
        <label>Alarm:</label>
        <Input
          type="text"
          placeholder="e.g., 15 mins before"
          value={alarm}
          onChange={(e) => setAlarm(e.target.value)}
        />
        <Button onClick={handleSave}>Save</Button>
        {data.event && <Button onClick={handleDelete}>Delete</Button>}
        <Button onClick={closeModal}>Cancel</Button>
      </ModalWrapper>
    </>
  );
};

export default Modal;
