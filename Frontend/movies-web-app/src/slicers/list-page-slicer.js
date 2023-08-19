import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL, accessToken } from "../utilities/constants";

const initialState = {
  loading: false,
  listOfMovies: [],
};

const listPageSlicer = createSlice({
  name: "listPage",
  initialState,
  reducers: {
    setLoading: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
    setListOfMovies: (state, action) => ({
      ...state,
      listOfMovies: action.payload,
    }),
  },
});

export const { setLoading, setListOfMovies } = listPageSlicer.actions;

export const fetchAllMovies = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  await axios
    .get(BaseURL, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    })
    .then((response) => {
      const responseData = response.data;
      dispatch(setListOfMovies(responseData));
    })
    .catch((error) => {
      console.error("error while fetching movies", error);
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export default listPageSlicer.reducer;
