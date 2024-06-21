import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInSide from "./components/SignInSide";
import { AuthProvider } from "./context/AuthProvider";
import ActivitiesPage from "./pages/ActivitiesPage";
import { ActivitiesProvider } from "./context/ActivitiesProvider";

function App() {
  setTimeout(function () {
    window.dispatchEvent(new Event("resize"));
  }, 500);
  console.log("app called");
  return (
    <AuthProvider>
      <ActivitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInSide />} />
            <Route path="/activities" element={<ActivitiesPage />} />
          </Routes>
        </BrowserRouter>
      </ActivitiesProvider>
    </AuthProvider>
  );
}

export default App;
