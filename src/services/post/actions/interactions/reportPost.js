import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const reportPost = createAsyncThunk(
  "post/reportPost",
  async ({ options, postId }) => {
    const data = await getFetch(
      `${API_URL}/post/${postId}/reportPost`,
      options
    );
    return data;
  }
);
