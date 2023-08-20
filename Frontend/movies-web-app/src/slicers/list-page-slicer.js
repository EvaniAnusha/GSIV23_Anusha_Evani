import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseURL, accessToken, SearchURL } from "../utilities/constants";

const initialState = {
  loadingList: false,
  listOfMovies: {},
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
    setListOfMovies: (state, action) => ({
      ...state,
      listOfMovies: action.payload,
    }),
    setSearchParam: (state, action) => ({
      ...state,
      searchParam: action.payload,
    }),
  },
});

export const { setLoadingList, setListOfMovies, setSearchParam } =
  listPageSlicer.actions;

export const fetchAllMovies = () => async (dispatch, getState) => {
  dispatch(setLoadingList(true));
  await axios
    .get(BaseURL, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        accept: "application/json",
      },
    })
    .then((response) => {
      if (response.data) {
        const responseData = response.data;
        const startingIndex = responseData.indexOf("(");
        const endingIndex = responseData.lastIndexOf(")");
        if (startingIndex !== -1 && endingIndex !== -1) {
          const jsonFormatData = responseData.substring(
            startingIndex + 1,
            endingIndex
          );
          try {
            const parsedData = JSON.parse(jsonFormatData);
            dispatch(setListOfMovies(parsedData));
          } catch (err) {
            console.error("error while parsing", err);
          }
        } else {
          console.error("Invalid response format found");
        }
        // dispatch(setListOfMovies(responseData));
      }
    })
    .catch((error) => {
      console.error("error while fetching movies", error);
    })
    .finally(() => {
      dispatch(setLoadingList(false));
    });
};

export const fetchSearchedMovies =
  (searchTerm) => async (dispatch, getState) => {
    dispatch(setLoadingList(true));
    await axios
      .get(SearchURL + "&query=" + searchTerm, {
        headers: {
          // Authorization: `Bearer ${accessToken}`,
          accept: "application/json",
        },
      })
      .then((response) => console.log("res=>", response));
  };

export default listPageSlicer.reducer;
