import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllMovies } from "../slicers/list-page-slicer";

function ListPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllMovies());
  }, []);
  return <div>Hello! this is the list view</div>;
}

export default ListPage;
