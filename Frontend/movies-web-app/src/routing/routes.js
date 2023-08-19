import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import history from "../utilities/history";
import ListPage from "../pages/list-page";

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
