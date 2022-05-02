import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  cards: []
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    getCards: (state) => {
      state.loading = true;
    },
    getCardsSuccess: (state, { payload }) => {
      state.cards = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getCardsFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  }
});

export const {
  getCards,
  getCardsSuccess,
  getCardsFailure
} = cardsSlice.actions;
export const cardsSelector = (state) => state.cards;
export default cardsSlice.reducer;

export function fetchCards() {
  return async (dispatch) => {
    dispatch(getCards());
    try {
      const response = await fetch(
        "/photos"
      );
      const data = await response.json();
      dispatch(getCardsSuccess(data));
    } catch (error) {
      dispatch(getCardsFailure());
    }
  };
}
