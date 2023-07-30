import { configureStore } from "@reduxjs/toolkit";
import auth from "./features/auth";
export const store = configureStore({
  reducer: {auth},
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
