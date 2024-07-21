import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ActivitiesPage } from "./pages/ActivitiesPage";
import { ActivityPage } from "./pages/ActivityPage";
import { StatsPage } from "./pages/StatsPage";
import { Provider } from "react-redux";
import { store } from "./context/store";
import { ActivitiesPageMock } from "./pages/ActivitiesPageMock";
import { StatsPageMock } from "./pages/StatsPageMock";
import { ActivityPageMock } from "./pages/ActivityPageMock";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/activities-mock" element={<ActivitiesPageMock />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/stats-mock" element={<StatsPageMock />} />
          <Route path="/stats/:activityId" element={<ActivityPage />} />
          <Route
            path="/stats-mock/:activityId"
            element={<ActivityPageMock />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
