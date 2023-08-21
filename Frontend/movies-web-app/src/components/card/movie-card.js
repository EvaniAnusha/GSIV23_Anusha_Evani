import React from "react";
import { useDispatch } from "react-redux";
import { Col, Card } from "antd";
import {
  setMovieID,
  fetchMovieDetails,
} from "../../slicers/details-page-slicer.js";
import imageNA from "../../../src/assets/images/imageNA.jpg";
import "../../styling/movie-card.scss";
const { Meta } = Card;
const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
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
  const handleDetailsOnClick = () => {
    dispatch(setMovieID(movie.id));
    dispatch(fetchMovieDetails(movie.id));
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
        onClick={handleDetailsOnClick}
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
