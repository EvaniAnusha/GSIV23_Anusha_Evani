import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListPage from "../pages/list-page.js";
import DetailsPage from "../pages/details-page.js";
import history from "../utilities/history.js";
import { setMovieDetailsInPage } from "../slicers/details-page-slicer.js";

const MainPage = () => {
  const { movieDetailsInPage } = useSelector((state) => state.detailsPage);
  const dispatch = useDispatch();
  const currentPath = window.location.pathname;
  useEffect(() => {
    if (currentPath === "/") {
      dispatch(setMovieDetailsInPage(false));
    }
  }, [currentPath]);
  const RenderOnPage = () => {
    if (currentPath === "/") {
      return <ListPage />;
    } else if (currentPath === "/details-page") {
      return <DetailsPage />;
    }
    if (movieDetailsInPage) {
      history.push("/details-page");
      return <DetailsPage />;
    } else {
      history.push("/");
      dispatch(setMovieDetailsInPage(false));
      return <ListPage />;
    }
  };
  return <>{RenderOnPage()}</>;
};

export default MainPage;
