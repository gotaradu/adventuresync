import React, { StrictMode } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInSide from "./components/SignInSide";
import CustomMap from "./components/CustomMap";
import { AuthProvider } from "./context/AuthProvider";
import { ActivitiesPage } from "./pages/ActivitiesPage";
function App() {
  setTimeout(function () {
    window.dispatchEvent(new Event("resize"));
  }, 500);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/activities" element={<ActivitiesPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
