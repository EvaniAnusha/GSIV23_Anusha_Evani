import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Layout } from "antd";
import { BaseURL } from "../utilities/constants.js";
import CardComponent from "../components/card/card-component.js";
import Loader from "../components/loader/loader.js";
import Header from "../components/header/header.js";
import "../styling/list-page.scss";

const ListPage = () => {
  const { searchResults, searchParam } = useSelector((state) => state.listPage);
  const [items, setItems] = useState([]);
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
          if (searchTerm.length > 0) {
            return [...searchResults];
          } else if (page === 1) {
            return [...data.results];
          } else {
            return [...prevItems, ...data.results];
          }
        }
      });
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("error while fetching the list of movies", error);
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
    <Row className="page-wrapper">
      <Loader loading={isLoading}>
        <Header />
        <Layout className="page-contents">
          {isLoading && <p>Loading...</p>}
          <CardComponent
            data={searchParam.length > 0 ? searchResults : items}
          />
          {error && <p>Error: {error.message}, Please try later</p>}
        </Layout>
      </Loader>
    </Row>
  );
};

export default ListPage;
