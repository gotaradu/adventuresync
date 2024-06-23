import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInSide from "./components/SignInSide";
import { ActivitiesPage } from "./pages/ActivitiesPage";

import { Provider } from "react-redux";
import { store } from "./context/store";

function App() {
  setTimeout(function () {
    window.dispatchEvent(new Event("resize"));
  }, 500);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInSide />} />
          <Route path="/activities" element={<ActivitiesPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
