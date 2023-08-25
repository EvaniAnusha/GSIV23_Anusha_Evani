import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "../search/search-bar.js";
import { Row, Col } from "antd";
import homeicon from "../../assets/images/home-icon.png";
import "../../styling/header.scss";
import { setMovieDetailsInPage } from "../../slicers/details-page-slicer.js";
import history from "../../utilities/history.js";

const Header = (searchP) => {
  const { movieDetailsInPage } = useSelector((state) => state.detailsPage);
  const dispatch = useDispatch();
  const handleOnClick = () => {
    history.push("/");
    dispatch(setMovieDetailsInPage(false));
  };

  return (
    <Row className="header-wrapper">
      <Col className="search">
        {movieDetailsInPage ? (
          <span className="details-header">Movie Details</span>
        ) : (
          <SearchBar />
        )}
      </Col>
      <Col className="home-icon">
        <img src={homeicon} className="home" onClick={handleOnClick} />
      </Col>
    </Row>
  );
};

export default Header;
