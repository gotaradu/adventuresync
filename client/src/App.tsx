import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ActivitiesPage } from "./pages/ActivitiesPage";
import StatsPage from "./pages/StatsPage";
import { Provider } from "react-redux";
import { store } from "./context/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
