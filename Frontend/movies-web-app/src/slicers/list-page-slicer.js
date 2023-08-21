import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SearchURL } from "../utilities/constants.js";

const initialState = {
  loadingList: false,
  searchParam: "",
  searchResults: [],
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
  },
});

export const { setLoadingList, setSearchParam, setSearchResults } =
  listPageSlicer.actions;

export const fetchSearchedMovies =
  (searchTerm) => async (dispatch, getState) => {
    dispatch(setLoadingList(true));
    await axios
      .get(SearchURL + "&query=" + searchTerm, {
        headers: {
          accept: "application/json",
        },
      })
      .then((response) => {
        if (response.data) {
          dispatch(setSearchResults(response.data.results));
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
