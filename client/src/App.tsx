import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInSide from "./components/SignInSide";
import CustomMap from "./components/CustomMap";

function App() {
  setTimeout(function () {
    window.dispatchEvent(new Event("resize"));
  }, 500);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInSide />} />
        <Route path="/activities" element={<CustomMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
