import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const toggleMention = createAsyncThunk(
  "notificationSetting/toggleMention",
  async (options) => {
    const response = await getFetch(`${API_URL}/notify/toggleMention`, options);
    if(response.error){
      throw new Error(response.error)
    }
    return response;
  }
);
