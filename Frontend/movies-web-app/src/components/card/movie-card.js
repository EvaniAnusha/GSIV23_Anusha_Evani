import React from "react";
import { Row, Col, Card } from "antd";
import "../../styling/movie-card.scss";

const MovieCard = ({ movie }) => {
  return (
    <Col>
      <Card title={movie.original_title}>{movie.overview}</Card>
    </Col>

    // <Row className="card-container">
    //   <Row className="movie-media">
    //     <Col className="picture-holder">{movie.poster_path}</Col>
    //   </Row>
    //   <Row className="movie-info">
    //     <Row className="header">
    //       <Col className="title">{movie.original_title}</Col>
    //       <Col className="rating">{movie.vote_average}</Col>
    //     </Row>
    //     <Row className="description">
    //       <Col className="two-liner-overview">{movie.overview}</Col>
    //     </Row>
    //   </Row>
    // </Row>
  );
};

export default MovieCard;
