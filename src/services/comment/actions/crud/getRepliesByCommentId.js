import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const getRepliesByCommentId = createAsyncThunk(
  "comment/getRepliesByCommentId",
  async ({ options, commentId }) => {
    const data = await getFetch(
      `${API_URL}/comment/getRepliesByCommentId/${commentId}`,
      options
    );
    return data;
  }
);
