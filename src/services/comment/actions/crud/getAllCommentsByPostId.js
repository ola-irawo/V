import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const getAllCommentsByPostId = createAsyncThunk(
  "commentPost/getAllCommentsByPostId",
  async ({ options, postId }) => {
    const response = await getFetch(
      `${API_URL}/comment/${postId}/comments`,
      options
    );
    if (response.error) {
      throw new Error(response.error);
    }
    console.log(response);
    return response;
  }
);
