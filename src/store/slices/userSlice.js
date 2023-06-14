import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    name: "",
    isDeleted: false,
  },
  reducers: {
    addRecipe: (state, action) => {
      console.log(state);
    },
  },
});
