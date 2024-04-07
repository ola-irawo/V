import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../../../api";
import { getFetch } from "../../../../libs/fetch";

export const shareComment = createAsyncThunk(
  "comment/shareComment",
  async ({ options, commentId }) => {
    const response = await getFetch(
      `${API_URL}/comment/${commentId}/share`,
      options
    );
    return response;
  }
);
