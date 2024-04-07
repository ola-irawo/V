import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const toggleCommentNotfication = createAsyncThunk(
  "notificationSetting/toggleCommentNotfication",
  async (options) => {
    const response = await getFetch(
      `${API_URL}/notify/toggleCommentNotifications`,
      options
    );
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  }
);
