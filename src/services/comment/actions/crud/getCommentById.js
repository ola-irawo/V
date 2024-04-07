import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const getCommentById = createAsyncThunk(
  "comment/getCommentById",
  async ({ options, commentId }) => {
    const data = await getFetch(
      `${API_URL}/comment/getCommentById/${commentId}`,
      options
    );

    return data;
  }
);
