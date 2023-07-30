import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  name: string;
  isAuth: boolean;
  uid: string;
};

const initialState: AuthState = {
  name: "",
  isAuth: false,
  uid: "string",
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.isAuth = true;
      state.uid = action.payload; // This seems incorrect, but I'm using it as you did in your code.
    },
    logout: () => initialState,
  },
});

export const { login, logout } = auth.actions;
export default auth.reducer;
