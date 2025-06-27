import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    chatSessionID: null,
    sessionChats: {},
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setChatSessionID(state, action) {
      state.chatSessionID = action.payload;
    },

    addMessageToSessionWhenEmpty: (state, action) => {
      state.sessionChats = action.payload;
    },
    loadSession: (state, action) => {
      state.chatSessionID = action.payload;
    },
  },
});

export const {
  login,
  logout,
  setChatSessionID,
  addMessageToSessionWhenEmpty,
  loadSession,
} = authSlice.actions;
export default authSlice.reducer;
