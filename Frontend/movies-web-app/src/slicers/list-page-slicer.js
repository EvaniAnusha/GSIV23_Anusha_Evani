import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SearchURL } from "../utilities/constants.js";

const initialState = {
  loadingList: false,
  searchParam: "",
  searchResults: [],
  // searchingPage: null,
};

const listPageSlicer = createSlice({
  name: "listPage",
  initialState,
  reducers: {
    setLoadingList: (state, action) => ({
      ...state,
      loadingList: action.payload,
    }),
    setSearchParam: (state, action) => ({
      ...state,
      searchParam: action.payload,
    }),
    setSearchResults: (state, action) => ({
      ...state,
      searchResults: action.payload,
    }),
    // setSearchingPage: (state, action) => ({
    //   ...state,
    //   searchingPage: action.payload,
    // }),
  },
});

export const { setLoadingList, setSearchParam, setSearchResults } =
  listPageSlicer.actions;

export const fetchSearchedMovies =
  (searchTerm, page) => async (dispatch, getState) => {
    dispatch(setLoadingList(true));
    await axios
      .get(SearchURL + "&query=" + searchTerm + "&page=" + page, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        if (response.data) {
          const data = response.data.results;
          dispatch(setSearchResults(data));
        }
      })
      .catch((error) => {
        console.error("error while fetching search results", error);
      })
      .finally(() => {
        dispatch(setLoadingList(false));
      });
  };

export default listPageSlicer.reducer;
