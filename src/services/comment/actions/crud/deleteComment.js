import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async ({ options, commentId }) => {
    const data = await getFetch(
      `${API_URL}/comment/deleteComment/${commentId}`,
      options
    );
    return data;
  }
);
