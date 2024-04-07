import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import {
  loginAction,
  logoutAction,
  signupAction,
  verifyOTPAction,
} from "../actions/authAction";

const authAdapter = createEntityAdapter({});

const initialState = authAdapter.getInitialState({
  status: "idle",
  error: null,
  userData: [],
});

const authSlice = createSlice({
  name: "auths",
  initialState,
  reducers: {
    updateAuthStatus(state, action) {
      state.status = action.payload;
    },
    setErrorStatus(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signupAction.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(signupAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(verifyOTPAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(verifyOTPAction.fulfilled, (state, action) => {
        state.status = "fulfilled";
      })
      .addCase(verifyOTPAction.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message.includes("400")) {
          state.error =
            "Oops! The code you entered is incorrect. Please double-check and try again.";
          return;
        }
        state.error = action.error.message;
      })
      .addCase(loginAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.status = "fulfilled";
        localStorage.setItem(
          "token",
          JSON.stringify({
            userUid: action.payload.id,
            userToken: action.payload.token,
            userName: action.payload.username,
            user: action.payload,
          })
        );
        authAdapter.upsertMany(state, [action.payload]);
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.status = "failed";
        if (action.error.message.includes("400")) {
          state.error = "Incorrect username or password";
          return;
        }
        state.error = action.error.message;
      })
      .addCase(logoutAction.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(logoutAction.fulfilled, (state, action) => {
        state.status = "fulfilled";
        localStorage.clear();
      })
      .addCase(logoutAction.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  selectAll: selectAuthenticatedUser,
  selectById: selectAuthenticatedById,
  selectIds: selectAuthenticatedIds,
} = authAdapter.getSelectors((state) => state.auths);

export const { updateAuthStatus, setErrorStatus } = authSlice.actions;

export const getauthStatus = (state) => state.auths.status;
export const userData = (state) => state.auths.userData;
export const getAuthError = (state) => state.auths.error;

export default authSlice.reducer;
