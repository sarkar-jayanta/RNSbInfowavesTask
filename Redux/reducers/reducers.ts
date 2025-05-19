import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "../types";

export const initialState: InitialState = {
 
};

export const reducer = createSlice({
  name: "global",
  initialState,
  reducers: {
   
  },
 
  },
);

export const {
  
} = reducer.actions;
export default reducer.reducer;
