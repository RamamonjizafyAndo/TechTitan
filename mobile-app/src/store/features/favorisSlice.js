import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoris: []
};

const favorisSlice = createSlice({
  name: "favoris",
  initialState,
  reducers: {
    setToggleFavoris: (state, action) => {
      state.favoris = action.payload || [];
    },
    resetFavoris: (state) => {
      state.favoris = [];
    },
  },
});

export const { setToggleFavoris, resetFavoris } = favorisSlice.actions;

export default favorisSlice.reducer;
