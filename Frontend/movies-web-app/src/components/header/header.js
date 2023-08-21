import React from "react";
import SearchBar from "../search/search-bar.js";
import { Row, Col } from "antd";
import homeicon from "../../assets/images/home-icon.png";
import "../../styling/header.scss";

const Header = () => {
  return (
    <Row className="header-wrapper">
      <Col className="search">
        <SearchBar />
      </Col>
      <Col className="home-icon">
        <img src={homeicon} className="home" />
      </Col>
    </Row>
  );
};

export default Header;
