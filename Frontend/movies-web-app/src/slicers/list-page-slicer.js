import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { accessToken, SearchURL } from "../utilities/constants.js";

const initialState = {
  loadingList: false,
  searchParam: "",
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
  },
});

export const { setLoadingList, setSearchParam } = listPageSlicer.actions;

export const fetchSearchedMovies =
  (searchTerm) => async (dispatch, getState) => {
    dispatch(setLoadingList(true));
    await axios
      .get(SearchURL + "&query=" + searchTerm, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          accept: "application/json",
        },
      })
      .then((response) => console.log("res=>", response));
  };

export default listPageSlicer.reducer;
