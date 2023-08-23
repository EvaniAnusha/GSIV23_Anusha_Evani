import React from "react";
import { useSelector } from "react-redux";
import Loader from "../components/loader/loader.js";
import Header from "../components/header/header.js";
import imageNA from "../assets/images/imageNA.jpg";
import { Row, Col, Layout } from "antd";
import "../styling/details-page.scss";

const DetailsPage = () => {
  const {
    loadingDetails,
    moviePoster,
    voteAvg,
    movieTitle,
    overview,
    runTime,
    releaseDate,
  } = useSelector((state) => state.detailsPage);

  return (
    <Row className="details-wrapper">
      <Loader loading={loadingDetails}>
        <Header />
        <Layout className="page-contents">
          <Col span={24} className="col">
            <Col span={4} className="poster-holder">
              <img
                className="poster-dimensions"
                src={moviePoster !== null ? moviePoster : imageNA}
              />
            </Col>
            <Col span={20} className="details-of-movie">
              <li>
                <span className="title-header">
                  {movieTitle} (Rating: {voteAvg})
                </span>
              </li>
              <li>
                <span className="release-runtime-params">
                  Original Release Date: {releaseDate} | Runtime: {runTime}
                </span>
              </li>
              <li>
                <span className="description">
                  Description:{" "}
                  {overview ? overview : "Not available at the moment"}
                </span>
              </li>
            </Col>
          </Col>
        </Layout>
      </Loader>
    </Row>
  );
};

export default DetailsPage;
