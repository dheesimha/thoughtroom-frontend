import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    newUser(state, action) {
      state.push(action.payload);
    },
  },
});

export const { newUser } = userSlice.actions;

export default userSlice.reducer;
