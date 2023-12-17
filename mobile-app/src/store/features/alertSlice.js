import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  message: "",
  type: "error",
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showAlert: (state, action) => {
      state.message =
        action.payload.message ||
        "defaultError"
      state.visible = true;
      state.type = action.payload.type || "error";
    },
    hideAlert: (state) => {
      state.message = "";
      state.visible = false;
      state.type = "error";
    },
  },
});

export const { showAlert, hideAlert } = alertSlice.actions;

export default alertSlice.reducer;
