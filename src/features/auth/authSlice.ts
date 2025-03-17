import { createSlice } from "@reduxjs/toolkit";

interface User {
  id: string;
  googleId?: string | null;
  email?: string | null;
  firstName: string;
  lastName: string;
  password: string;
  role?: string | null;
  newUser: boolean;
  createdAt?: string; // Assuming ISO string format for DateTime
  updatedAt?: string;
}

// Define the AuthState type
interface AuthState {
  accessToken?: string;
  user?: User;
}

// Initial state with type annotation
const initialState: AuthState = {
  accessToken: undefined,
  user: undefined,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
  },
});

export const { userLogin, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
