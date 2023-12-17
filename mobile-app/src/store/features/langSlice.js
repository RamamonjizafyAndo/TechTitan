import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: "fr",
};

const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    changeLang: (state, action) => {
      state.lang = action.payload || "fr";
    },
  },
});

export const { changeLang } = langSlice.actions;

export default langSlice.reducer;
