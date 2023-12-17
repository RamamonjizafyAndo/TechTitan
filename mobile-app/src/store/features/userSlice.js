import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  user: null,
  isAuthenticated: false,
  token: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.id = action.payload.id || state.id;
      state.user = action.payload.user || state.user;
      state.token = action.payload.token || state.token;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.id = null;
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
