import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  hasErrors: false,
  card: {}
};

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    getCard: (state) => {
      state.loading = true;
    },
    getCardSuccess: (state, { payload }) => {
      state.card = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getCardFailure: (state) => {
      state.loading = false;
      state.hasErrors = true;
    }
  }
});

export const { getCard, getCardSuccess, getCardFailure } = cardSlice.actions;
export const cardSelector = (state) => state.card;
export default cardSlice.reducer;

export function fetchCard(id) {
  return async (dispatch) => {
    dispatch(getCard());
    try {
      const response = await fetch(
        `/photos/${id}`
      );
      const data = await response.json();
      dispatch(getCardSuccess(data));
    } catch (error) {
      dispatch(getCardFailure());
    }
  };
}
