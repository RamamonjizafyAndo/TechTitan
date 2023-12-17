import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false
};

const backdropSlice = createSlice({
  name: "backdrop",
  initialState,
  reducers: {
    showBackdrop: (state) => {
      state.visible = true;
    },
    hideBackdrop: (state) => {
      state.visible = false;
    },
  },
});

export const { showBackdrop, hideBackdrop } = backdropSlice.actions;

export default backdropSlice.reducer;
