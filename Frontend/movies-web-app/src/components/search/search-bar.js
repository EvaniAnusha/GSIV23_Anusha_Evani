import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchParam,
  fetchSearchedMovies,
  setSearchResults,
} from "../../slicers/list-page-slicer.js";
import { Input } from "antd";
import "../../styling/search-bar.scss";
const { Search } = Input;

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = () => {
    dispatch(setSearchParam(searchValue));
    dispatch(fetchSearchedMovies(searchValue));
  };
  const handleOnClear = () => {
    dispatch(setSearchParam(""));
    dispatch(setSearchResults([]));
  };
  return (
    <Search
      className="search-bar"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      placeholder="Search"
      onSearch={handleSearch}
      allowClear
      onClear={handleOnClear}
    />
  );
};

export default SearchBar;
