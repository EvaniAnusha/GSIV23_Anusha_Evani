import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchParam,
  fetchSearchedMovies,
} from "../../slicers/list-page-slicer.js";
import { Input } from "antd";
import "../../styling/search-bar.scss";
const { Search } = Input;

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchParam } = useSelector((state) => state.listPage);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    if (searchParam !== "") {
      dispatch(fetchSearchedMovies(searchValue));
    }
  }, [searchParam]);
  const handleSearch = () => {
    dispatch(setSearchParam(searchValue));
  };
  return (
    <Search
      className="search-bar"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Search"
      onSearch={handleSearch}
      allowClear
      enterButton
    />
  );
};

export default SearchBar;