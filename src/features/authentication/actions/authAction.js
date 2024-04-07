import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL, getFetch } from "../index";

export const signupAction = createAsyncThunk(
  "auth/signupAuth",
  async (payload) => {
    const response = await getFetch(`${API_URL}/user/signup`, payload);
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  }
);

export const loginAction = createAsyncThunk(
  "auth/loginAuth",
  async (payload) => {
    const response = await getFetch(`${API_URL}/user/login`, payload);
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  }
);

export const logoutAction = createAsyncThunk(
  "auth/logoutAuth",
  async (options) => {
    const response = await getFetch(`${API_URL}/user/logout`, options);
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  }
);

export const verifyOTPAction = createAsyncThunk(
  "auth/OTPAuth",
  async (payload) => {
    const response = await getFetch(`${API_URL}/user/verifyEmail`, payload);
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  }
);

export const useAsyncThunk = (typePrefix, url, payload) => {
  const asyncThunk = createAsyncThunk(typePrefix, async (payload) => {
    const data = await getFetch(`${url}`, payload);
    return data;
  });
};
