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
  const { loadingList, searchResults } = useSelector((state) => state.listPage);
  const [searchValue, setSearchValue] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const handlingScroll = () => {
    // const scrollThreshold = 200;
    // const isScrollingUp = window.scrollY < scrollThreshold;
    // if (isScrollingUp && searchPage > 1) {
    //   setSearchPage((currPage) => currPage - 1);
    //   return;
    // } else
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      loadingList
    ) {
      return;
    }
    setSearchPage((prevPage) => prevPage + 1);
  };
  const handleSearch = () => {
    dispatch(setSearchParam(searchValue));
    dispatch(fetchSearchedMovies(searchValue, searchPage));
  };
  const handleOnClear = () => {
    dispatch(setSearchParam(""));
    dispatch(setSearchResults([]));
    setSearchPage(1);
  };
  useEffect(() => {
    dispatch(fetchSearchedMovies(searchValue, searchPage));
  }, [searchPage]);
  useEffect(() => {
    if (searchValue.length !== 0) {
      window.addEventListener("scroll", handlingScroll);
      return () => window.removeEventListener("scroll", handlingScroll);
    }
  }, [handlingScroll]);
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
