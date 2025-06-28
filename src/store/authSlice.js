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
    /**
     * Sets the authenticated user and updates authentication status.
     * @param {object} state - The current Redux state.
     * @param {object} action - Action containing the user payload.
     */
    login(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    /**
     * Resets user and authentication status on logout.
     * @param {object} state - The current Redux state.
     */
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.chatSessionID = null; // Clear active session on logout
      state.sessionChats = {}; // Clear all chat history on logout
    },
    /**
     * Sets the ID of the currently active chat session.
     * @param {object} state - The current Redux state.
     * @param {object} action - Action containing the chatSessionID payload.
     */
    setChatSessionID(state, action) {
      state.chatSessionID = action.payload;
    },
    /**
     * Initializes or replaces all chat sessions in the state, typically used
     * on initial load when all user messages are fetched and grouped.
     * @param {object} state - The current Redux state.
     * @param {object} action - Action containing an object of grouped sessions.
     * Payload format: { [sessionID1]: [msg1, msg2], [sessionID2]: [msg3] }
     */
    addMessageToSessionWhenEmpty: (state, action) => {
      // This reducer is intended for populating all sessions initially.
      // It will replace any existing `sessionChats` with the new payload.
      state.sessionChats = action.payload;
    },
    /**
     * Updates messages for a specific chat session.
     * This reducer is designed to handle a single new message from real-time updates.
     * @param {object} state - The current Redux state.
     * @param {object} action - Action containing `sessionId` and `message` payload.
     * Payload format: { sessionId: '...', message: { ...singleMessageObject }, type: 'add' }
     */
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
    /**
     * Sets the currently active chat session ID. This is effectively a duplicate of `setChatSessionID`.
     * Consider if both are necessary or if `setChatSessionID` can be used universally.
     * @param {object} state - The current Redux state.
     * @param {object} action - Action containing the session ID to load.
     */
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
