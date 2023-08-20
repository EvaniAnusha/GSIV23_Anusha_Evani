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

export default listPageSlicer.reducer;
