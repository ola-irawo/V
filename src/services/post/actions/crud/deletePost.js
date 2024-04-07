import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../api";
import { getFetch } from "../../../../libs/fetch";

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async ({ options, postId }) => {
    const response = await getFetch(
      `${API_URL}/post/deletePost/${postId}`,
      options
    );
    if (response.error) {
      throw new Error(response.error);
    }
    return { response, postId };
  }
);
