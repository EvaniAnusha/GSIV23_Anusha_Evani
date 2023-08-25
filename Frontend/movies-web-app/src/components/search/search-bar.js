import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchParam,
  fetchSearchedMovies,
  setSearchResults,
  setSearchOn,
} from "../../slicers/list-page-slicer.js";
import { Input } from "antd";
import "../../styling/search-bar.scss";
const { Search } = Input;

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchPage } = useSelector((state) => state.listPage);
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = () => {
    dispatch(setSearchParam(searchValue));
    dispatch(fetchSearchedMovies(searchValue, searchPage));
    dispatch(setSearchOn(true));
  };
  const handleOnClear = () => {
    dispatch(setSearchParam(""));
    dispatch(setSearchResults([]));
    dispatch(setSearchOn(false));
  };
  useEffect(() => {
    if (searchValue.length > 0) {
      dispatch(fetchSearchedMovies(searchValue, searchPage));
    }
  }, [searchPage]);

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
