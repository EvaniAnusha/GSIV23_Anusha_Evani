import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Layout } from "antd";
import { fetchAllMovies } from "../slicers/list-page-slicer";
import CardComponent from "../components/card/card-component";
import Loader from "../components/loader/loader";
import Header from "../components/header/header";
import "../styling/list-page.scss";

const ListPage = () => {
  const dispatch = useDispatch();
  const { loadingList, listOfMovies } = useSelector((state) => state.listPage);
  useEffect(() => {
    dispatch(fetchAllMovies());
  }, []);

  return (
    <Row className="page-wrapper">
      <Loader loading={loadingList}>
        <Header />
        <Layout className="page-contents">
          <CardComponent data={listOfMovies.results} />
        </Layout>
      </Loader>
    </Row>
  );
};

export default ListPage;
