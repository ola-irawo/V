import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const bookmarkPost = createAsyncThunk(
  "post/bookmarkPost",
  async ({ options, userUid, postId }) => {
    const data = await getFetch(
      `${API_URL}/post/${userUid}/bookmarkPost/${postId}`,
      options
    );
    return data;
  }
);
