import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Layout } from "antd";
import { BaseURL } from "../utilities/constants.js";
// import { fetchSearchedMovies } from "../slicers/list-page-slicer.js";
import CardComponent from "../components/card/card-component.js";
import Loader from "../components/loader/loader.js";
import Header from "../components/header/header.js";
import "../styling/list-page.scss";

const ListPage = () => {
  const { searchResults, searchParam } = useSelector((state) => state.listPage);
  // const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [searchItems, setSearchItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchData = async (searchTerm) => {
    setIsLoading(true);
    setError(null);
    const options = {
      headers: {
        accept: "application/json",
      },
    };
    try {
      const url = `${BaseURL}&page=${page}`;
      const response = await fetch(url, options);
      const data = await response.json();
      setItems((prevItems) => {
        {
          if (page === 1) {
            return [...data.results];
          } else {
            return [...prevItems, ...data.results];
          }
        }
      });
      if (searchTerm.length > 0) {
        setSearchItems((preItems) => {
          if (page === 1) {
            return [...searchResults];
          } else {
            return [...preItems, ...searchResults];
          }
        });
      }
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("error while fetching", error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData(searchParam);
  }, []);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchData(searchParam);
  };

  useEffect(() => {
    if (searchParam.length === 0) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isLoading, handleScroll]);
  return (
    <React.Fragment>
      <Row className="page-wrapper">
        <Loader loading={isLoading}>
          <Header />
          <Layout className="page-contents">
            {isLoading && <p>Loading...</p>}
            <CardComponent
              data={searchParam.length > 0 ? searchResults : items}
            />
            {error && <p>Error: {error.message}</p>}
          </Layout>
        </Loader>
      </Row>
    </React.Fragment>
  );
};

export default ListPage;
