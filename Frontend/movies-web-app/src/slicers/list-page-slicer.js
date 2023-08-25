import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL, SearchURL } from "../utilities/constants.js";

const initialState = {
  loadingAllResults: false,
  loadingSearchResults: false,
  allMoviesData: [],
  searchParam: "",
  searchPage: 1,
  searchOn: false,
  searchResults: [],
};

const listPageSlicer = createSlice({
  name: "listPage",
  initialState,
  reducers: {
    setLoadingAllResults: (state, action) => ({
      ...state,
      loadingAllResults: action.payload,
    }),
    setLoadingSearchResults: (state, action) => ({
      ...state,
      loadingSearchResults: action.payload,
    }),
    setAllMoviesData: (state, action) => ({
      ...state,
      allMoviesData: action.payload,
    }),
    setSearchParam: (state, action) => ({
      ...state,
      searchParam: action.payload,
    }),
    setSearchPage: (state, action) => ({
      ...state,
      searchPage: action.payload,
    }),
    setSearchOn: (state, action) => ({
      ...state,
      searchOn: action.payload,
    }),
    setSearchResults: (state, action) => ({
      ...state,
      searchResults: action.payload,
    }),
  },
});

export const {
  setLoadingAllResults,
  setLoadingSearchResults,
  setAllMoviesData,
  setSearchParam,
  setSearchPage,
  setSearchOn,
  setSearchResults,
} = listPageSlicer.actions;

export const fetchAllMovies = (page) => async (dispatch, getState) => {
  dispatch(setLoadingSearchResults(true));
  await axios
    .get(BaseURL + "&page=" + page, {
      headers: {
        accept: "application/json",
      },
    })
    .then((response) => {
      if (response.data) {
        const data = response.data;
        dispatch(setAllMoviesData(data));
      }
    })
    .catch((error) => {
      console.error("error while fetching movies", error);
    })
    .finally(() => {
      dispatch(setLoadingSearchResults(false));
    });
};

export const fetchSearchedMovies =
  (searchTerm, page) => async (dispatch, getState) => {
    dispatch(setLoadingSearchResults(true));
    await axios
      .get(SearchURL + "&query=" + searchTerm + "&page=" + page, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        if (response.data) {
          const data = response.data;
          dispatch(setSearchResults(data));
        }
      })
      .catch((error) => {
        console.error("error while fetching search results", error);
      })
      .finally(() => {
        dispatch(setLoadingSearchResults(false));
      });
  };

export default listPageSlicer.reducer;
