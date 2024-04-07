import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const getUserBookmarks = createAsyncThunk(
  "bookmark/getUserBookmarks",
  async ({ options, userUid }) => {
    const response = await getFetch(
      `${API_URL}/post/${userUid}/getUserBookmarks`,
      options
    );
    if (response.error) {
      throw new Error(response.error);
    }
    return response;
  }
);
