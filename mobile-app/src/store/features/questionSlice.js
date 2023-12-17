import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    questions: [],
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    addQuestion: (state, action) => {
      state.questions = [...state.questions, ...action.payload.questions] || state.questions;
    },
    removeQuestion: (state, action) => {
      state.questions = state.questions.filter((item) => item.id !== action.payload);
    },
    clearQuestion: (state) => {
      state.questions = []
    }
  },
});

export const { addQuestion, removeQuestion, clearQuestion } = questionSlice.actions;

export default questionSlice.reducer;
