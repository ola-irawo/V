import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const upvoteComment = createAsyncThunk(
  "comment/upvoteComment",
  async ({ options, commentId }) => {
    const response = await getFetch(
      `${API_URL}/comment/upUpvote/${commentId}`,
      options
    );
    return response;
  }
);
