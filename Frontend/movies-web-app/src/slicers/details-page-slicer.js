import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { defaultURL, apiKey } from "../utilities/constants.js";
const initialState = {
  loadingDetails: false,
  movieID: null,
};

const detailsPageSlicer = createSlice({
  name: "detailsPage",
  initialState,
  reducers: {
    setLoadingDetails: (state, action) => ({
      ...state,
      loadingDetails: action.payload,
    }),
    setMovieID: (state, action) => ({
      ...state,
      movieID: action.payload,
    }),
  },
});

export const { setLoadingDetails, setMovieID } = detailsPageSlicer.actions;

export const fetchMovieDetails = (movieiD) => async (dispatch, getState) => {
  dispatch(setLoadingDetails(true));
  const URL = defaultURL + movieiD + "?" + apiKey;
  await axios
    .get(URL, {
      headers: {
        accept: "application/json",
      },
    })
    .then((response) => {
      if (response.data) {
        console.log("details of movie response ===>", response.data);
      }
    })
    .catch((error) => {
      console.error("error while fetching movie details", error);
    })
    .finally(() => {
      dispatch(setLoadingDetails(false));
    });
};

export default detailsPageSlicer.reducer;
