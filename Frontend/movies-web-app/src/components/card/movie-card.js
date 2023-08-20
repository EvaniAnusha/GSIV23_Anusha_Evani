import React from "react";
import { Col, Card } from "antd";
import imageNA from "../../../src/assets/images/imageNA.jpg";
import "../../styling/movie-card.scss";
const { Meta } = Card;
const MovieCard = ({ movie }) => {
  const componentToRender = () => {
    if (movie) {
      return (
        <div className="title-rating">
          <span className="title">{movie.original_title}</span>
          <span className="rating">{movie.vote_average}</span>
        </div>
      );
    }
  };
  return (
    <Col className="movie-info">
      <Card
        hoverable
        cover={
          <img
            className="poster-props"
            alt="poster"
            src={
              movie.poster_path !== null
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : imageNA
            }
          />
        }
        className="movie-card-container"
      >
        <Meta
          title={componentToRender()}
          description={
            movie.overview ? movie.overview : "Description not available"
          }
        />
      </Card>
    </Col>
  );
};

export default MovieCard;
