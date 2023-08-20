import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Layout } from "antd";
import { BaseURL, accessToken } from "../utilities/constants.js";
import CardComponent from "../components/card/card-component.js";
import Loader from "../components/loader/loader.js";
import Header from "../components/header/header.js";
import "../styling/list-page.scss";

const ListPage = () => {
  const { loadingList } = useSelector((state) => state.listPage);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    const options = {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    };
    try {
      const response = await fetch(`${BaseURL}&page=${page}`, options);
      console.log(response);
      const data = await response.json();
      console.log("data", data);
      setItems((prevItems) => {
        {
          if (page === 1) {
            console.log("page", page);
            return [...data.results];
          } else {
            console.log("page number ===>", page);
            return [...prevItems, ...data.results];
          }
        }
      });
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (page === 1) {
      fetchData();
    }
  }, []);
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    fetchData();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <React.Fragment>
      <Row className="page-wrapper">
        <Loader loading={loadingList}>
          <Header />
          <Layout className="page-contents">
            {isLoading && <p>Loading...</p>}
            <CardComponent data={items} />
            {error && <p>Error: {error.message}</p>}
          </Layout>
        </Loader>
      </Row>
    </React.Fragment>
  );
};

export default ListPage;
