import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import history from "../utilities/history.js";
import MainPage from "../components/main-page.js";
import ListPage from "../pages/list-page.js";
import DetailsPage from "../pages/details-page.js";

function RoutesConfiguration() {
  return (
    <Router history={history}>
      {
        <>
          <Routes>
            <Route path="/" exact={true} element={<MainPage />} />
          </Routes>
          <Routes>
            <Route
              path="/details-page"
              exact={true}
              element={<DetailsPage />}
            />
          </Routes>
        </>
      }
    </Router>
  );
}

export default RoutesConfiguration;
