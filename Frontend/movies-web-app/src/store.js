import { configureStore } from "@reduxjs/toolkit";
import listPageReducer from "./slicers/list-page-slicer.js";

const store = configureStore({
  reducer: {
    listPage: listPageReducer,
  },
});

export default store;

const getStore = () => store;
const getState = () => store.getState();

export { getStore, getState };
