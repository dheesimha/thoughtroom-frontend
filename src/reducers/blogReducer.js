import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogRoute",
  initialState: [],
  reducers: {
    blogList(state, action) {
      state = action.payload;
    },
  },
});

export const { blogList } = blogSlice.actions;
export default blogSlice.reducer;
