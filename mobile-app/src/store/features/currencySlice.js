import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: {
    label: "EURO",
    value: "EURO",
  },
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    changeCurreny: (state, action) => {
      state.currency = action.payload;
    },
  },
});

export const { changeCurreny } = currencySlice.actions;

export default currencySlice.reducer;
