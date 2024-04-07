import { createAsyncThunk } from "@reduxjs/toolkit";
import { getFetch } from "../../../../libs/fetch";
import { API_URL } from "../../../api";

export const comment = createAsyncThunk(
  "post/comment",
  async (payload, commentId) => {
    const data = await getFetch(`${API_URL}/commentPost/${commentId}`, payload);
    return data;
  }
);
