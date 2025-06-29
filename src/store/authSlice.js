import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    chatSessionID: null, // The ID of the currently active chat session
    sessionChats: {}, // Object to store messages grouped by chatSessionID
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.chatSessionID = null; // Clear active session on logout
      state.sessionChats = {}; // Clear all chat history on logout
    },

    setChatSessionID(state, action) {
      state.chatSessionID = action.payload;
    },
    updateSessionChat: (state, action) => {
      // Renamed from updateSessionChats
      const { sessionId, message, type } = action.payload;

      if (!state.sessionChats[sessionId]) {
        state.sessionChats[sessionId] = []; // Initialize array if session doesn't exist
      }

      // Add the new message to the specific session's chat array
      if (type === "add") {
        // Prevent adding duplicates, especially useful if messages are saved and then received via real-time
        if (
          !state.sessionChats[sessionId].some((msg) => msg.id === message.id)
        ) {
          state.sessionChats[sessionId].push(message);
        }
      }
      // Future: Could add 'remove' or 'update' types here if needed
    },
    addMessageToSessionWhenEmpty: (state, action) => {
      // This reducer is intended for populating all sessions initially.
      // It will replace any existing `sessionChats` with the new payload.
      state.sessionChats = action.payload;
    },

    loadSession: (state, action) => {
      state.chatSessionID = action.payload;
    },
  },
});

// Export actions and the reducer
export const {
  login,
  logout,
  setChatSessionID,
  addMessageToSessionWhenEmpty,
  loadSession,
  updateSessionChat, // Renamed export here
} = authSlice.actions;
export default authSlice.reducer;
