import { configureStore } from "@reduxjs/toolkit";
import listPageReducer from "./slicers/list-page-slicer.js";
import detailsPageReducer from "./slicers/details-page-slicer.js";

const store = configureStore({
  reducer: {
    listPage: listPageReducer,
    detailsPage: detailsPageReducer,
  },
});

export default store;

const getStore = () => store;
const getState = () => store.getState();

export { getStore, getState };
