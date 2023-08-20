import React from "react";
import MovieCard from "./movie-card";
import { Row, Col } from "antd";

const CardComponent = ({ data }) => {
  if (data && data.length > 0)
    return (
      <Row gutter={[16, 16]}>
        {data.map((item) => (
          <Col key={item.id} xs={6} sm={6} md={6} lg={6}>
            <MovieCard key={item.id} movie={item} />
          </Col>
        ))}
      </Row>
    );
};

export default CardComponent;
