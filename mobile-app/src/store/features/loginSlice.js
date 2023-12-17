import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  token: ""
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    changeLogin: (state, action) => {
      state.email = action.payload.email || state.email;
      state.password = action.payload.password || state.password;
      state.token = action.payload.token || state.token;
    },
  },
}); 

export const { changeLogin } = loginSlice.actions;

export default loginSlice.reducer;