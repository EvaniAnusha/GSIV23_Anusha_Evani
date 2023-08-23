import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { defaultURL, apiKey } from "../utilities/constants.js";
const initialState = {
  loadingDetails: false,
  movieID: null,
  movieDetailsInPage: false,
  moviePoster: "",
  movieTitle: "",
  overview: "",
  runTime: "",
  releaseDate: "",
  voteAvg: "",
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
    setMovieDetailsInPage: (state, action) => ({
      ...state,
      movieDetailsInPage: action.payload,
    }),
    setMoviePoster: (state, action) => ({
      ...state,
      moviePoster: action.payload,
    }),
    setMovieTitle: (state, action) => ({
      ...state,
      movieTitle: action.payload,
    }),
    setRunTime: (state, action) => ({
      ...state,
      runTime: action.payload,
    }),
    setOverview: (state, action) => ({
      ...state,
      overview: action.payload,
    }),
    setReleaseDate: (state, action) => ({
      ...state,
      releaseDate: action.payload,
    }),
    setVoteAvg: (state, action) => ({
      ...state,
      voteAvg: action.payload,
    }),
  },
});

export const {
  setLoadingDetails,
  setMovieID,
  setMovieDetailsInPage,
  setMoviePoster,
  setMovieTitle,
  setRunTime,
  setOverview,
  setReleaseDate,
  setVoteAvg,
} = detailsPageSlicer.actions;

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
        const detailsOfMovie = response.data;
        dispatch(setMovieDetailsInPage(true));
        dispatch(
          setMoviePoster(
            `https://image.tmdb.org/t/p/w500/${detailsOfMovie.poster_path}`
          )
        );
        dispatch(setMovieTitle(detailsOfMovie.original_title));
        dispatch(setVoteAvg(detailsOfMovie.vote_average));
        dispatch(setReleaseDate(detailsOfMovie.release_date));
        dispatch(setRunTime(detailsOfMovie.runtime));
        dispatch(setOverview(detailsOfMovie.overview));
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
