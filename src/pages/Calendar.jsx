import React, { useState } from "react";
import CalendarGrid from "../components/CalendarGrid";
import Modal from "../components/Modal";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const openModal = (date) => {
    setSelectedDate(date);
  };

  const closeModal = () => {
    setSelectedDate(null);
  };

  return (
    <div
      style={{
        textAlign: "center",
        color: "white",
        backgroundColor: "#121212",
        height: "100vh",
      }}
    >
      <h1>Calendar</h1>
      <CalendarGrid onDateClick={openModal} />
      {selectedDate && <Modal date={selectedDate} closeModal={closeModal} />}
    </div>
  );
};

export default Calendar;
