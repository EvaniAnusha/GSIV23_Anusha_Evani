import React from "react";
import SearchBar from "../search/search-bar";
import { Row, Col } from "antd";
import "../../styling/header.scss";

const Header = () => {
  return (
    <Row className="header-wrapper">
      <SearchBar />
    </Row>
  );
};

export default Header;
