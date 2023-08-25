import React from "react";
import MovieCard from "./movie-card.js";
import { Row, Col } from "antd";

const CardComponent = ({ data }) => {
  if (data && data.length > 0)
    return (
      <Row gutter={[16, 16]}>
        {data.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={6} lg={6}>
            <MovieCard key={item.id} movie={item} />
          </Col>
        ))}
      </Row>
    );
};

export default CardComponent;
