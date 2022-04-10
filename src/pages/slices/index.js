import { combineReducers } from "redux";
import cardsReducer from "./cards";
import cardReducer from "./card";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  cards: cardsReducer,
  card: cardReducer
});

const store = configureStore({
  reducer: rootReducer
});

export default store;
