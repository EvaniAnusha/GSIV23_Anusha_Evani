import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL, accessToken } from "../utilities/constants";

const initialState = {
  loadingList: false,
  listOfMovies: {},
};

const listPageSlicer = createSlice({
  name: "listPage",
  initialState,
  reducers: {
    setLoadingList: (state, action) => ({
      ...state,
      loadingList: action.payload,
    }),
    setListOfMovies: (state, action) => ({
      ...state,
      listOfMovies: action.payload,
    }),
  },
});

export const { setLoadingList, setListOfMovies } = listPageSlicer.actions;

export const fetchAllMovies = () => async (dispatch, getState) => {
  dispatch(setLoadingList(true));
  await axios
    .get(BaseURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    })
    .then((response) => {
      if (response.data) {
        const responseData = response.data;
        dispatch(setListOfMovies(responseData));
      }
    })
    .catch((error) => {
      console.error("error while fetching movies", error);
    })
    .finally(() => {
      dispatch(setLoadingList(false));
    });
};

export default listPageSlicer.reducer;
