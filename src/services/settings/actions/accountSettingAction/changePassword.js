import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const changePassword = createAsyncThunk(
  "accountSetting/changePassword",
  async (options) => {
    const response = await getFetch(`${API_URL}/user/password`, options);
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  }
);
