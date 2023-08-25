import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Layout, Pagination, Col } from "antd";
import { fetchAllMovies, setSearchPage } from "../slicers/list-page-slicer.js";
import CardComponent from "../components/card/card-component.js";
import Loader from "../components/loader/loader.js";
import Header from "../components/header/header.js";
import "../styling/list-page.scss";

const ListPage = () => {
  const {
    searchResults,
    searchParam,
    searchOn,
    allMoviesData,
    loadingAllResults,
    loadingSearchResults,
  } = useSelector((state) => state.listPage);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllMovies(page));
    if (searchOn) {
      if (page <= searchResults.total_pages) {
        dispatch(setSearchPage(page));
      }
    }
  }, [page]);

  const handlePagination = (e) => {
    setPage(e);
    if (searchOn) {
      let temp = page;
      if (temp > searchResults.total_pages) {
        dispatch(setSearchPage(1));
      } else {
        dispatch(setSearchPage(e));
      }
    }
  };
  useEffect(() => {
    if ( (allMoviesData.type !== undefined &&
      allMoviesData.results.length === 0) ||
      (searchParam.length > 0 && searchResults.type !== undefined && searchResults.results.length === 0)
    ) {
      setError("Error occurred, Please try later");
    }
  }, []);

  return (
    <Row className="page-wrapper">
      <Loader loading={loadingAllResults}>
        <Header />
        <Layout className="page-contents">
          <Row>
            <Col span={24} className="loading-message">
              {loadingAllResults && <p>Loading...</p>}
            </Col>
            <Col span={24} className="movies-display">
              <Col span={24} className="movies-container">
                <CardComponent
                  data={searchParam.length > 0 ? searchResults.results : allMoviesData.results}
                />
              </Col>
            </Col>
            <Col span={24} className="footer">
              <Col span={12} align="left" className="error-message">
                {!loadingAllResults || !loadingSearchResults
                  ? error && <p>{error}</p>
                  : ""}
              </Col>
              <Col span={12} align="right" className="pagination">
                <Pagination
                  size="small"
                  disabled={
                    loadingAllResults ||
                    loadingSearchResults ||
                    (searchParam.length > 0 && searchResults.type !== undefined && searchResults.results.length === 0) ||
                    (allMoviesData.type !==undefined && allMoviesData.results.length === 0)
                  }
                  total={
                    searchParam.length > 0
                      ? searchResults.total_pages
                      : allMoviesData.total_pages
                  }
                  showSizeChanger
                  showQuickJumper
                  showTotal={(total) => `Total ${total} items`}
                  onChange={(e) => {
                    handlePagination(e);
                  }}
                />
              </Col>
            </Col>
          </Row>
        </Layout>
      </Loader>
    </Row>
  );
};

export default ListPage;
