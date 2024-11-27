import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calendar from "./pages/Calendar";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
