import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddCommentFormSchema } from "../types/addCommentForm";

const initialState: AddCommentFormSchema = {
  text: "",
  error: "",
};

export const addCommentSlice = createSlice({
  name: "addCommentForm",
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(loginByUsername.pending, (state) => {
    //   state.error = undefined
    // })
    // builder.addCase(loginByUsername.fulfilled, (state, action) => {
    // })
    // builder.addCase(loginByUsername.rejected, (state, action) => {
    //   state.error = action.payload
    // })
  },
});

export const { actions: addCommentActions } = addCommentSlice;
export const { reducer: addCommentReducer } = addCommentSlice;
