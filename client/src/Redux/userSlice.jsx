import { createSlice } from "@reduxjs/toolkit";

const userAuthslice = createSlice({
  name: "userSlice",
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user= action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setUser, setToken } = userAuthslice.actions;
export default userAuthslice.reducer;