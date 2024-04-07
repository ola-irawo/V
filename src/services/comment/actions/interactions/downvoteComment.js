import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const downvoteComment = createAsyncThunk(
  "comment/downvoteComment",
  async ({ options, commentId }) => {
    const data = await getFetch(
      `${API_URL}/comment/downUpvote/${commentId}`,
      options
    );
    return data;
  }
);
