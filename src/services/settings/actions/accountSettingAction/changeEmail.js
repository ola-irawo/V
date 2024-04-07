import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const changeEmail = createAsyncThunk(
  "accountSetting/changeEmail",
  async (options) => {
    const response = await getFetch(`${API_URL}/user/email`, options);
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  }
);
