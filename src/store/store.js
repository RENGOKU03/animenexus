import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./authSlice";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
});

const persistedReducer = persistReducer({ key: "root", storage }, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// ✅ Export the persistor
export const persistor = persistStore(store);
