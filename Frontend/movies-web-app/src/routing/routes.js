import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import history from "../utilities/history.js";
import ListPage from "../pages/list-page.js";

function RoutesConfiguration() {
  return (
    <Router history={history}>
      {
        <Routes>
          <Route path="/" exact={true} element={<ListPage />} />
        </Routes>
      }
    </Router>
  );
}

export default RoutesConfiguration;
