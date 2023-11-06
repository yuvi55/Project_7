import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./components/Home.jsx";
import Gallery from "./components/Gallery.jsx";
import Crew_mate from "./components/Crew_mate.jsx";
import Error from "./components/Error.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Update_Card from "./components/Update_Card.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Crew_mate />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/gallery/:id" element={<Update_Card />} />
      <Route path="/error" element={<Error />} />
      <Route path="*" element={<Navigate to="/error" />} />
    </Routes>
  </Router>
);
