import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMovies } from "../slicers/list-page-slicer";
import CardComponent from "../components/card/card-component";
import Loader from "../components/loader/loader";

const ListPage = () => {
  const dispatch = useDispatch();
  const { loadingList, listOfMovies } = useSelector((state) => state.listPage);
  useEffect(() => {
    dispatch(fetchAllMovies());
  }, []);

  return (
    <Loader loading={loadingList}>
      <CardComponent data={listOfMovies.results} />
    </Loader>
  );
};

export default ListPage;
